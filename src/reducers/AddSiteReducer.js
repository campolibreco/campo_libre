import _ from 'lodash';

import {
    OPEN_SITE_UPLOAD_MODAL,
    CLOSE_SITE_UPLOAD_MODAL,
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
    ADD_SITE_FAILURE, INITIALIZE_MAP
} from '../actions/types';

import {campsite, reducerAlerts} from '../locale.en';

const {campsite_form: {accessibility_options, facilities_options, price_options}} = campsite;

const INITIAL_STATE = {
    addSiteModalVisible: false,
    latitudeText: '',
    readyLatitude: 0,
    longitudeText: '',
    readyLongitude: 0,
    siteTitleText: '',
    siteDescriptionText: '',
    siteDirectionsText: '',
    siteNearestTownText: '',
    accessibilityOption: accessibility_options.paved_road,
    facilitiesOption: facilities_options.full_service,
    priceOption: price_options.free,
    siteReadyForUpload: false,
    sitesShouldUpdate: false
};

const removeNonNumbers = (text) => {
    return text.replace(/[^0-9.-]/g, '');
};

const siteIsReadyForUpload = ({latitudeText, longitudeText, siteTitleText, siteDescriptionText, siteDirectionsText, siteNearestTownText, accessibilityOption, facilitiesOption, priceOption}) => {
    return latitudeText && longitudeText && siteTitleText && siteDescriptionText && siteDirectionsText && siteNearestTownText && accessibilityOption && facilitiesOption && priceOption;
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case OPEN_SITE_UPLOAD_MODAL:
            return {...state, addSiteModalVisible: true};

        case CLOSE_SITE_UPLOAD_MODAL:
            return {...state, addSiteModalVisible: false};

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
            return {...INITIAL_STATE, addSiteModalVisible: true};

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

        case CHECK_IF_SITE_IS_READY:
            const siteReadyForUpload = siteIsReadyForUpload(state);

            return {...state, siteReadyForUpload};

        case ADD_SITE_SUCCESS:
            return {...INITIAL_STATE, sitesShouldUpdate: true};

        case ADD_SITE_FAILURE:
            return {...state, addSiteModalVisible: false};

        case INITIALIZE_MAP:
            return {...state, sitesShouldUpdate: false};

        default:
            return state;
    }
}