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
    CURRENT_LOCATION_UPDATED,
    CHECK_IF_SITE_IS_READY,
    ADD_SITE_SUCCESS,
    ADD_SITE_FAILURE,
    MAP_IS_INITIALIZING,
    SITE_DETAIL_CHECKBOX_UPDATED,
    FACEBOOK_LOGOUT_COMPLETE
} from '../actions/types';

import {campsite, reducerAlerts} from '../locale.en';

const {campsite_form: {accessibility_options, facilities_options, price_options, features_options}} = campsite;

const INITIAL_STATE = {
    latitudeText: '',
    readyLatitude: 0,
    longitudeText: '',
    readyLongitude: 0,
    siteTitleText: '',
    siteDescriptionText: '',
    siteDirectionsText: '',
    siteNearestTownText: '',
    accessibilityOption: accessibility_options.paved_road,
    priceOption: price_options.free,
    siteReadyForUpload: false,
    sitesShouldUpdate: false,
    siteDetailCheckboxesKeys: {facilities: [], features: []}
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
        updatedSiteDetailCheckboxesKeyList[siteDetailCheckboxesSubKey] = _.concat(siteDetailCheckboxesKeys[siteDetailCheckboxesSubKey], siteDetailCheckboxKey);
    }

    return updatedSiteDetailCheckboxesKeyList;
};

const removeNonNumbers = (text) => {
    return text.replace(/[^0-9.-]/g, '');
};

const siteIsReadyForUpload = ({latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, siteDetailCheckboxesKeys, priceOption}) => {
    return latitudeText && longitudeText && siteTitleText && siteDescriptionText && siteDirectionsText && siteNearestTownText && accessibilityOption && priceOption && siteDetailCheckboxesKeys.facilities.length > 0 && siteDetailCheckboxesKeys.features.length > 0;
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case LATITUDE_TEXT_UPDATED:
            const {latitudeText} = payload;
            const cleanLatText = removeNonNumbers(latitudeText);
            const readyLatitude = _.toNumber(cleanLatText);

            return {...state, latitudeText: cleanLatText, readyLatitude};

        case LONGITUDE_TEXT_UPDATED:
            const {longitudeText} = payload;
            const cleanLongText = removeNonNumbers(longitudeText);
            const readyLongitude = _.toNumber(cleanLongText);

            return {...state, longitudeText: cleanLongText, readyLongitude};

        case SITE_TITLE_TEXT_CHANGED:
            const {siteTitleText} = payload;
            return {...state, siteTitleText};

        case SITE_DESCRIPTION_TEXT_CHANGED:
            const {siteDescriptionText} = payload;
            return {...state, siteDescriptionText};

        case SITE_DIRECTIONS_TEXT_CHANGED:
            const {siteDirectionsText} = payload;
            return {...state, siteDirectionsText};

        case SITE_NEAREST_TOWN_TEXT_CHANGED:
            const {siteNearestTownText} = payload;
            return {...state, siteNearestTownText};

        case SITE_ACCESSIBILITY_OPTION_CHANGED:
            const {accessibilityOption} = payload;
            return {...state, accessibilityOption};

        case SITE_FACILITIES_OPTION_CHANGED:
            const {facilitiesOption} = payload;
            return {...state, facilitiesOption};

        case SITE_PRICE_OPTION_CHANGED:
            const {priceOption} = payload;
            return {...state, priceOption};

        case ADD_SITE_FIELDS_RESET:
            return {...INITIAL_STATE};

        case CURRENT_LOCATION_UPDATED:
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

        case SITE_DETAIL_CHECKBOX_UPDATED:
            const {siteDetailCheckboxKey} = payload;
            const updatedSiteDetailCheckboxesKeys = updateSiteDetailCheckboxesKeys(state, siteDetailCheckboxKey);

            return {...state, siteDetailCheckboxesKeys: updatedSiteDetailCheckboxesKeys};

        case CHECK_IF_SITE_IS_READY:
            const siteReadyForUpload = siteIsReadyForUpload(state);

            return {...state, siteReadyForUpload};

        case ADD_SITE_SUCCESS:
            return {...INITIAL_STATE, sitesShouldUpdate: true};

        case ADD_SITE_FAILURE:
            return {...state};

        case MAP_IS_INITIALIZING:
            return {...state, sitesShouldUpdate: false};

        case FACEBOOK_LOGOUT_COMPLETE:
            return INITIAL_STATE;

        default:
            return state;
    }
}