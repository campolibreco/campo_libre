import _ from 'lodash';

import {
    INITIALIZE_MAP,
    VIEW_STYLE_UPDATE,
    MAP_READY,
    MAP_REGION_CHANGE,
    FACEBOOK_LOGOUT_COMPLETE,
    FILTER_CRITERIA_UPDATED,
    FILTER_TOGGLE_LOGIC_UPDATED,
    FILTER_CRITERIA_RESET,
    SELECTED_SITE_UPDATE,
    SELECTED_SITE_CLEARED

} from '../actions/types';

import {map} from "../constants";
import {campsite, forest_names} from '../locale.en';

const {campsite_form: {accessibility_options, facilities_options, features_options, price_options}} = campsite;

const INITIAL_STATE = {
    lastKnownRegion: {
        latitude: 39.45920664966847,
        latitudeDelta: 2.032473192672093,
        longitude: -105.7341373487853,
        longitudeDelta: 1.781939358781671
    },
    mapLoaded: false,
    viewStyle: map.SearchOptions.MAP,
    sites: [],
    displaySites: [],
    filterResultsScrutinyLoose: {facilities: true, features: true},
    filterCriteriaKeys: {accessibility: [], facilities: [], price: [], features: [], forest: []},
    selectedSite: {}
};

const getBoundingBoxForRegion = ({region}) => {
    return {
        west: region.longitude - (region.longitudeDelta / 2), // westLng - min lng
        south: region.latitude - (region.latitudeDelta / 2), // southLat - min lat
        east: region.longitude + (region.longitudeDelta / 2), // eastLng - max lng
        north: region.latitude + (region.latitudeDelta / 2) // northLat - max lat
    }
};

const siteIsInBoundingBox = ({site, boundingBox}) => {
    const {coordinate: {longitude, latitude}} = site;

    const westOK = longitude > boundingBox.west;
    const eastOK = longitude < boundingBox.east;
    const northOK = latitude < boundingBox.north;
    const southOK = latitude > boundingBox.south;

    return westOK && eastOK && northOK && southOK;
};

const updateFilterResultsScrutiny = ({filterResultsScrutinyLoose}, filterToggleKey) => {
    let filterResultsScrutinyClone = _.cloneDeep(filterResultsScrutinyLoose);

    filterResultsScrutinyClone[filterToggleKey] = !filterResultsScrutinyClone[filterToggleKey];

    return filterResultsScrutinyClone;
};

const updateFilterKeys = ({filterCriteriaKeys}, filterKey) => {
    let filterCriteriaSubKey = null;

    if (_.includes(_.keys(accessibility_options), filterKey)) {
        filterCriteriaSubKey = 'accessibility';
    } else if (_.includes(_.keys(facilities_options), filterKey)) {
        filterCriteriaSubKey = 'facilities';
    } else if (_.includes(_.keys(features_options), filterKey)) {
        filterCriteriaSubKey = 'features';
    } else if (_.includes(_.keys(price_options), filterKey)) {
        filterCriteriaSubKey = 'price';
    } else if (_.includes(_.keys(forest_names), filterKey)) {
        filterCriteriaSubKey = 'forest';
    }

    const keyIsAlreadyInList = _.includes(filterCriteriaKeys[filterCriteriaSubKey], filterKey);
    let updatedFilterKeyList = _.cloneDeep(filterCriteriaKeys);

    if (keyIsAlreadyInList) {
        updatedFilterKeyList[filterCriteriaSubKey] = _.reject(filterCriteriaKeys[filterCriteriaSubKey], existingFilterKey => existingFilterKey === filterKey);
    } else {
        updatedFilterKeyList[filterCriteriaSubKey] = _.concat(filterCriteriaKeys[filterCriteriaSubKey], filterKey);
    }

    return updatedFilterKeyList;
};

const filterSites = ({sites, filterResultsScrutinyLoose, lastKnownRegion}, updatedFilterKeys) => {
    const boundingBox = getBoundingBoxForRegion({region: lastKnownRegion});

    const filteredSites = _.filter(sites, site => {
        const {accessibility, price, facilities, features, forest} = site;
        let accessibilityMatch = false;
        let facilitiesMatch = false;
        let featuresMatch = false;
        let priceMatch = false;
        let forestMatch = false;

        const siteIsInView = siteIsInBoundingBox({site, boundingBox});

        if(!siteIsInView){
            return false;
        }

        if (updatedFilterKeys.accessibility.length === 0) {
            accessibilityMatch = true;
        } else {
            accessibilityMatch = _.includes(updatedFilterKeys.accessibility, accessibility);
        }

        if (updatedFilterKeys.facilities.length === 0) {
            facilitiesMatch = true;
        } else {
            if (filterResultsScrutinyLoose.facilities) {
                facilitiesMatch = _.some(updatedFilterKeys.facilities, facilityFromFilterList => {
                    return _.includes(facilities, facilityFromFilterList);
                });
            } else {
                facilitiesMatch = _.every(updatedFilterKeys.facilities, facilityFromFilterList => {
                    return _.includes(facilities, facilityFromFilterList);
                });
            }
        }

        if (updatedFilterKeys.features.length === 0) {
            featuresMatch = true;
        } else {
            if (filterResultsScrutinyLoose.features) {
                featuresMatch = _.some(updatedFilterKeys.features, featureFromFilterList => {
                    return _.includes(features, featureFromFilterList);
                });
            } else {
                featuresMatch = _.every(updatedFilterKeys.features, featureFromFilterList => {
                    return _.includes(features, featureFromFilterList);
                });
            }
        }

        if (updatedFilterKeys.price.length === 0) {
            priceMatch = true;
        } else {
            priceMatch = _.includes(updatedFilterKeys.price, price);
        }

        if (updatedFilterKeys.forest.length === 0) {
            forestMatch = true;
        } else {
            forestMatch = _.includes(updatedFilterKeys.forest, forest);
        }

        return accessibilityMatch && facilitiesMatch && priceMatch && featuresMatch && forestMatch;
    });

    return filteredSites;
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case INITIALIZE_MAP:
            const {sites} = payload;
            const existingMapLoadedState = state.mapLoaded;

            return payload ? {
                ...INITIAL_STATE,
                lastKnownRegion: state.lastKnownRegion,
                sites: sites,
                filterCriteriaKeys: state.filterCriteriaKeys,
                displaySites: filterSites({
                    sites,
                    filterResultsScrutinyLoose: state.filterResultsScrutinyLoose,
                    lastKnownRegion: state.lastKnownRegion
                }, state.filterCriteriaKeys),
                mapLoaded: existingMapLoadedState,
                filterResultsScrutinyLoose: state.filterResultsScrutinyLoose,
                selectedSite: state.selectedSite,
                viewStyle: state.viewStyle
            } : INITIAL_STATE;

        case VIEW_STYLE_UPDATE:
            return {...state, viewStyle: payload};

        case MAP_READY:
            return {...state, mapLoaded: true};

        case MAP_REGION_CHANGE:
            const {newRegion} = payload;
            const sitesFromRegionChange = filterSites({...state, lastKnownRegion: newRegion}, state.filterCriteriaKeys);

            return {...state, lastKnownRegion: newRegion, displaySites: sitesFromRegionChange};

        case FACEBOOK_LOGOUT_COMPLETE:
            return INITIAL_STATE;

        case FILTER_CRITERIA_UPDATED:
            const {filterKey} = payload;
            const updatedFilterKeys = updateFilterKeys(state, filterKey);
            const newlyFilteredSites = filterSites(state, updatedFilterKeys);

            return {...state, filterCriteriaKeys: updatedFilterKeys, displaySites: newlyFilteredSites};

        case FILTER_CRITERIA_RESET:
            const filterResetSites = filterSites(state, INITIAL_STATE.filterCriteriaKeys);

            return {
                ...state,
                filterCriteriaKeys: INITIAL_STATE.filterCriteriaKeys,
                filterResultsScrutinyLoose: INITIAL_STATE.filterResultsScrutinyLoose,
                displaySites: filterResetSites
            };

        case FILTER_TOGGLE_LOGIC_UPDATED:
            const {filterToggleKey} = payload;
            const updatedFilterResultsScrutinyLooseObject = updateFilterResultsScrutiny(state, filterToggleKey);
            const newlyFiteredSitesWithNewToggleLogic = filterSites({
                sites: state.sites,
                filterResultsScrutinyLoose: updatedFilterResultsScrutinyLooseObject,
                lastKnownRegion: state.lastKnownRegion
            }, state.filterCriteriaKeys);

            return {
                ...state,
                filterResultsScrutinyLoose: updatedFilterResultsScrutinyLooseObject,
                displaySites: newlyFiteredSitesWithNewToggleLogic
            };

        case SELECTED_SITE_UPDATE:
            const {selectedSite} = payload;

            return {...state, selectedSite};

        case SELECTED_SITE_CLEARED:
            return {...state, selectedSite: INITIAL_STATE.selectedSite};

        default:
            return state;
    }
};
