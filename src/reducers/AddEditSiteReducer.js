import {combineReducers} from 'redux';
import _ from 'lodash';

import {
    LATITUDE_TEXT_UPDATED,
    LONGITUDE_TEXT_UPDATED,
    SITE_TITLE_TEXT_CHANGED,
    SITE_DESCRIPTION_TEXT_CHANGED,
    SITE_DIRECTIONS_TEXT_CHANGED,
    SITE_NEAREST_TOWN_TEXT_CHANGED,
    SITE_ACCESSIBILITY_OPTION_CHANGED,
    SITE_FACILITIES_OPTION_CHANGED,
    SITE_PRICE_OPTION_CHANGED,
    ADD_SITE_FIELDS_RESET,
    EDIT_SITE_FIELDS_RESET,
    CURRENT_LOCATION_UPDATED,
    CHECK_IF_SITE_IS_READY,
    ADD_SITE_SUCCESS,
    ADD_SITE_FAILURE,
    MAP_IS_INITIALIZING,
    SITE_DETAIL_CHECKBOX_UPDATED,
    FACEBOOK_LOGOUT_COMPLETE,
    ADDSITE_IMAGE_UPDATED,
    ALTERNATE_SITES_TEXT_CHANGED,
    SITE_CELL_PROVIDER_CHANGED,
    SITE_CELL_STRENGTH_CHANGED,
    SITE_COUNTY_OPTION_CHANGED,
    SITE_FOREST_OPTION_CHANGED,
    SITE_MVUM_OPTION_CHANGED,
    NEW_SITE_TO_EDIT, GIVE_ME_CREDIT_TOGGLE_UPDATED, SITE_ADDED_TO_PENDING_UPLOAD
} from '../actions/types';

import {campsite, reducerAlerts, counties, forest_names, mvum_names} from '../locale.en';
import {site_form_type} from '../constants';

const {campsite_form: {accessibility_options, facilities_options, price_options, features_options, cell_provider_options, cell_strength_options}} = campsite;

const INITIAL_STATE = {
    latitudeText: '',
    readyLatitude: 0,
    longitudeText: '',
    readyLongitude: 0,
    siteTitleText: '',
    siteImageData: '',
    siteDescriptionText: '',
    siteDirectionsText: '',
    siteAlternateSitesText: '',
    siteNearestTownText: '',
    accessibilityOption: accessibility_options.blank,
    priceOption: price_options.blank,
    countyOption: counties.blank,
    forestOption: forest_names.blank,
    mvumOption: mvum_names.blank,
    cellProviderOption: cell_provider_options.blank,
    cellStrengthOption: cell_strength_options.blank,
    siteReadyForUpload: false,
    siteDetailCheckboxesKeys: {facilities: [], features: []},
    id: '',
    giveCredit: true
};

const setInitialEditStateFromSite = ({siteToEdit}) => {
    const {accessibility, alternateSites = '', approvalState, cellProvider = '', cellStrength = '', coordinate, county = '', description, directions, facilities, features, forest = '', mvum = '', nearestTown, price, siteImageData, title, id, uploadedBy = {giveCredit: false}} = siteToEdit;
    const {latitude, longitude} = coordinate;

    const siteStateToDispatch = {
        accessibilityOption: accessibility,
        siteAlternateSitesText: alternateSites,
        approvalState,
        cellProviderOption: cellProvider,
        cellStrengthOption: cellStrength,
        latitudeText: latitude.toString(),
        readyLatitude: latitude,
        longitudeText: longitude.toString(),
        readyLongitude: longitude,
        countyOption: county,
        siteDescriptionText: description,
        siteDirectionsText: directions,
        siteDetailCheckboxesKeys: {
            facilities,
            features
        },
        forestOption: forest,
        mvumOption: mvum,
        siteNearestTownText: nearestTown,
        priceOption: price,
        siteImageData,
        siteTitleText: title,
        id,
        uploadedBy,
        giveCredit: uploadedBy.giveCredit
    };

    return siteStateToDispatch;
};

const updateSiteDetailCheckboxesKeys = ({siteDetailCheckboxesKeys}, siteDetailCheckboxKey) => {
    let siteDetailCheckboxesSubKey = null;

    if (_.includes(_.keys(features_options), siteDetailCheckboxKey)) {
        siteDetailCheckboxesSubKey = 'features';
    } else if (_.includes(_.keys(facilities_options), siteDetailCheckboxKey)) {
        siteDetailCheckboxesSubKey = 'facilities';
    }

    const keyIsAlreadyInList = _.includes(siteDetailCheckboxesKeys[siteDetailCheckboxesSubKey], siteDetailCheckboxKey);
    let updatedSiteDetailCheckboxesKeyList = _.cloneDeep(siteDetailCheckboxesKeys);

    if (keyIsAlreadyInList) {
        updatedSiteDetailCheckboxesKeyList[siteDetailCheckboxesSubKey] = _.reject(siteDetailCheckboxesKeys[siteDetailCheckboxesSubKey], existingSiteDetailCheckboxKey => existingSiteDetailCheckboxKey === siteDetailCheckboxKey);
    } else {
        if (siteDetailCheckboxesSubKey === 'facilities') {
            if (siteDetailCheckboxKey === 'none') {
                updatedSiteDetailCheckboxesKeyList[siteDetailCheckboxesSubKey] = [];
            } else {
                updatedSiteDetailCheckboxesKeyList[siteDetailCheckboxesSubKey] = _.reject(updatedSiteDetailCheckboxesKeyList[siteDetailCheckboxesSubKey], existingFilterKey => existingFilterKey === 'none');
            }
        }

        updatedSiteDetailCheckboxesKeyList[siteDetailCheckboxesSubKey] = _.concat(updatedSiteDetailCheckboxesKeyList[siteDetailCheckboxesSubKey], siteDetailCheckboxKey);
    }

    return updatedSiteDetailCheckboxesKeyList;
};

const removeNonNumbers = (text) => {
    return text.replace(/[^0-9.-]/g, '');
};

const siteIsReadyForUpload = ({latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, siteDetailCheckboxesKeys, priceOption, siteImageData}) => {
    return !!latitudeText && !!longitudeText && !!siteTitleText && !!siteDescriptionText && !!siteDirectionsText && !!siteNearestTownText && !!accessibilityOption && !!priceOption && !!siteImageData && siteDetailCheckboxesKeys.facilities.length > 0 && siteDetailCheckboxesKeys.features.length > 0;
};

const formReducer = prefix => (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case NEW_SITE_TO_EDIT:
            if (prefix === site_form_type.EDIT) {
                const {siteToEdit} = payload;
                const siteStateToDispatch = setInitialEditStateFromSite({siteToEdit});

                return {...siteStateToDispatch};
            } else {
                return state;
            }

        case SITE_ADDED_TO_PENDING_UPLOAD:
            if (prefix === site_form_type.ADD) {
                return {...INITIAL_STATE};
            } else {
                return state;
            }

        case `${prefix}_${LATITUDE_TEXT_UPDATED}`:
            const {latitudeText} = payload;
            const cleanLatText = removeNonNumbers(latitudeText);
            const readyLatitude = _.toNumber(cleanLatText);

            return {...state, latitudeText: cleanLatText, readyLatitude};

        case `${prefix}_${LONGITUDE_TEXT_UPDATED}`:
            const {longitudeText} = payload;
            const cleanLongText = removeNonNumbers(longitudeText);
            const readyLongitude = _.toNumber(cleanLongText);

            return {...state, longitudeText: cleanLongText, readyLongitude};

        case `${prefix}_${SITE_TITLE_TEXT_CHANGED}`:
            const {siteTitleText} = payload;
            return {...state, siteTitleText};

        case `${prefix}_${SITE_DESCRIPTION_TEXT_CHANGED}`:
            const {siteDescriptionText} = payload;
            return {...state, siteDescriptionText};

        case `${prefix}_${SITE_DIRECTIONS_TEXT_CHANGED}`:
            const {siteDirectionsText} = payload;
            return {...state, siteDirectionsText};

        case `${prefix}_${ALTERNATE_SITES_TEXT_CHANGED}`:
            const {siteAlternateSitesText} = payload;
            return {...state, siteAlternateSitesText};

        case `${prefix}_${SITE_NEAREST_TOWN_TEXT_CHANGED}`:
            const {siteNearestTownText} = payload;
            return {...state, siteNearestTownText};

        case `${prefix}_${SITE_ACCESSIBILITY_OPTION_CHANGED}`:
            const {accessibilityOption} = payload;
            return {...state, accessibilityOption};

        case `${prefix}_${SITE_PRICE_OPTION_CHANGED}`:
            const {priceOption} = payload;
            return {...state, priceOption};

        case `${prefix}_${SITE_COUNTY_OPTION_CHANGED}`:
            const {countyOption} = payload;
            return {...state, countyOption};

        case `${prefix}_${SITE_FOREST_OPTION_CHANGED}`:
            const {forestOption} = payload;
            return {...state, forestOption};

        case `${prefix}_${SITE_MVUM_OPTION_CHANGED}`:
            const {mvumOption} = payload;
            return {...state, mvumOption};

        case `${prefix}_${SITE_CELL_PROVIDER_CHANGED}`:
            const {cellProviderOption} = payload;
            return {...state, cellProviderOption};

        case `${prefix}_${SITE_CELL_STRENGTH_CHANGED}`:
            const {cellStrengthOption} = payload;
            return {...state, cellStrengthOption};

        case `${prefix}_${ADD_SITE_FIELDS_RESET}`:
            return {...INITIAL_STATE};

        case `${prefix}_${CURRENT_LOCATION_UPDATED}`:
            const {currentLocation: {longitude, latitude}} = payload;
            const stringLong = _.toString(longitude);
            const stringLat = _.toString(latitude);

            return {
                ...state,
                longitudeText: stringLong,
                latitudeText: stringLat,
                readyLatitude: latitude,
                readyLongitude: longitude
            };

        case `${prefix}_${ADDSITE_IMAGE_UPDATED}`:
            const {updatedImage} = payload;
            const siteImageData = updatedImage.hasImage ? updatedImage.base64 : '';

            return {...state, siteImageData};

        case `${prefix}_${SITE_DETAIL_CHECKBOX_UPDATED}`:
            const {siteDetailCheckboxKey} = payload;
            const updatedSiteDetailCheckboxesKeys = updateSiteDetailCheckboxesKeys(state, siteDetailCheckboxKey);

            return {...state, siteDetailCheckboxesKeys: updatedSiteDetailCheckboxesKeys};

        case `${prefix}_${CHECK_IF_SITE_IS_READY}`:
            const siteReadyForUpload = siteIsReadyForUpload(state);

            return {...state, siteReadyForUpload};

        case `${prefix}_${MAP_IS_INITIALIZING}`:
            return {...state};

        case `${prefix}_${GIVE_ME_CREDIT_TOGGLE_UPDATED}`:
            const {newGiveMeCreditValue} = payload;
            return {...state, giveCredit: newGiveMeCreditValue};

        case `${prefix}_${FACEBOOK_LOGOUT_COMPLETE}`:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export default combineReducers({
    add: formReducer(site_form_type.ADD),
    edit: formReducer(site_form_type.EDIT)
});