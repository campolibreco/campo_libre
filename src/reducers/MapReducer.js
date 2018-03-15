import _ from 'lodash';

import {
    INITIALIZE_MAP,
    VIEW_STYLE_UPDATE,
    MAP_READY,
    MAP_REGION_CHANGE,
    FACEBOOK_LOGOUT_COMPLETE,
    FILTER_CRITERIA_UPDATED

} from '../actions/types';

import {map} from "../constants";
import {campsite} from '../locale.en';

const {campsite_form: {accessibility_options, facilities_options, price_options}} = campsite;

const sampleSiteMarkers = [
    {
        id: 1,
        title: 'Twin Lakes Hidden Spot',
        description: 'Beautiful view of Twin Lakes off this hidden forest road.',
        coordinate: {
            longitude: -106.391015,
            latitude: 39.085855
        }
    },
    {
        id: 2,
        title: 'Lily Lake',
        description: 'Nice view of the lilypads in this secluded spot, but a pretty tough road to reach it.',
        coordinate: {
            longitude: -106.368051,
            latitude: 39.351661
        }
    },
    {
        id: 3,
        title: 'Slide Lake',
        description: 'Pretty riverside camping, but a REALLY nasty road to get there.',
        coordinate: {
            longitude: -106.389204,
            latitude: 39.372171
        }
    }
];

const INITIAL_STATE = {
    lastKnownRegion: {
        longitude: -105.727939,
        latitude: 39.695168,
        longitudeDelta: 1,
        latitudeDelta: 1
    },
    mapLoaded: false,
    viewStyle: map.SearchOptions.MAP,
    sites: [],
    displaySites: [],
    filterCriteriaKeys: {accessibility: [], facilities: [], price: []}
};

const updateFilterKeys = ({filterCriteriaKeys}, filterKey) => {
    let filterCriteriaSubKey = null;

    if (_.includes(_.keys(accessibility_options), filterKey)) {
        filterCriteriaSubKey = 'accessibility';
    } else if (_.includes(_.keys(facilities_options), filterKey)) {
        filterCriteriaSubKey = 'facilities';
    } else if (_.includes(_.keys(price_options), filterKey)) {
        filterCriteriaSubKey = 'price';
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

const filterSites = ({sites}, updatedFilterKeys) => {
    if (updatedFilterKeys.accessibility.length === 0 && updatedFilterKeys.facilities.length === 0 && updatedFilterKeys.price.length === 0) {
        return sites;
    }

    const allPossibleFilterOptions = _.reduce([accessibility_options, facilities_options, price_options], (acc, optionObject) => {
        _.forEach(optionObject, (value, key) => {
            acc[key] = value;
        });

        return acc;
    }, {});

    const filteredSites = _.filter(sites, site => {
        const {accessibility, price, facilities} = site;
        let accessibilityMatch = false;
        let facilitiesMatch = false;
        let priceMatch = false;

        if (updatedFilterKeys.accessibility.length === 0) {
            accessibilityMatch = true;
        } else {
            const accessibilityFullTextArray = _.map(updatedFilterKeys.accessibility, filterKey => accessibility_options[filterKey]);
            accessibilityMatch = _.includes(accessibilityFullTextArray, accessibility);
        }

        if (updatedFilterKeys.facilities.length === 0) {
            facilitiesMatch = true;
        } else {
            const facilitiesFullTextArray = _.map(updatedFilterKeys.facilities, filterKey => facilities_options[filterKey]);
            facilitiesMatch = _.includes(facilitiesFullTextArray, facilities);
        }

        if (updatedFilterKeys.price.length === 0) {
            priceMatch = true;
        } else {
            const pricesFullTextArray = _.map(updatedFilterKeys.price, filterKey => price_options[filterKey]);
            priceMatch = _.includes(pricesFullTextArray, price);
        }

        return accessibilityMatch && facilitiesMatch && priceMatch;
    });

    return filteredSites;
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case INITIALIZE_MAP:
            const {region, sites} = payload;
            const existingMapLoadedState = state.mapLoaded;

            return payload ? {
                ...INITIAL_STATE,
                lastKnownRegion: region,
                sites: sites,
                filterCriteriaKeys: state.filterCriteriaKeys,
                displaySites: filterSites({sites}, state.filterCriteriaKeys),
                mapLoaded: existingMapLoadedState
            } : INITIAL_STATE;

        case VIEW_STYLE_UPDATE:
            return {...state, viewStyle: payload};

        case MAP_READY:
            return {...state, mapLoaded: true};

        case MAP_REGION_CHANGE:
            return {...state, lastKnownRegion: payload};

        case FACEBOOK_LOGOUT_COMPLETE:
            return INITIAL_STATE;

        case FILTER_CRITERIA_UPDATED:
            const {filterKey} = payload;
            const updatedFilterKeys = updateFilterKeys(state, filterKey);
            const newlyFilteredSites = filterSites(state, updatedFilterKeys);

            return {...state, filterCriteriaKeys: updatedFilterKeys, displaySites: newlyFilteredSites};


        default:
            return state;
    }
};
