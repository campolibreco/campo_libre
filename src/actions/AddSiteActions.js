import firebase from '@firebase/app';
import '@firebase/firestore'

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
    ADD_SITE_SUCCESS,
    ADD_SITE_FAILURE,
    CHECK_IF_SITE_IS_READY,
    SITE_DETAIL_CHECKBOX_UPDATED,
    ALTERNATE_SITES_TEXT_CHANGED
} from './types';

import {navKeys} from '../constants';

export const updateLatitudeText = ({latitudeText}) => {
    return {
        type: LATITUDE_TEXT_UPDATED,
        payload: {latitudeText}
    }
};

export const updateLongitudeText = ({longitudeText}) => {
    return {
        type: LONGITUDE_TEXT_UPDATED,
        payload: {longitudeText}
    }
};

export const updateSiteTitleText = ({siteTitleText}) => {
    return {
        type: SITE_TITLE_TEXT_CHANGED,
        payload: {siteTitleText}
    }
};

export const updateSiteDescriptionText = ({siteDescriptionText}) => {
    return {
        type: SITE_DESCRIPTION_TEXT_CHANGED,
        payload: {siteDescriptionText}
    }
};

export const updateSiteDirectionsText = ({siteDirectionsText}) => {
    return {
        type: SITE_DIRECTIONS_TEXT_CHANGED,
        payload: {siteDirectionsText}
    }
};


export const updateAlternateSitesText = ({alternateSitesText}) => {
    return {
        type: ALTERNATE_SITES_TEXT_CHANGED,
        payload: {alternateSitesText}
    }
};

export const updateSiteNearestTownText = ({siteNearestTownText}) => {
    return {
        type: SITE_NEAREST_TOWN_TEXT_CHANGED,
        payload: {siteNearestTownText}
    }
};

export const updateAccessibilityOption = ({accessibilityOption}) => {
    return {
        type: SITE_ACCESSIBILITY_OPTION_CHANGED,
        payload: {accessibilityOption}
    }
};

export const updateFacilitiesOption = ({facilitiesOption}) => {
    return {
        type: SITE_FACILITIES_OPTION_CHANGED,
        payload: {facilitiesOption}
    }
};

export const updatePriceOption = ({priceOption}) => {
    return {
        type: SITE_PRICE_OPTION_CHANGED,
        payload: {priceOption}
    }
};

export const resetAddScreenFields = () => {
    return {
        type: ADD_SITE_FIELDS_RESET
    }
};

export const checkIfSiteIsReadyForUpload = () => {
    return {
        type: CHECK_IF_SITE_IS_READY
    }
};

export const siteDetailCheckboxWasClicked = ({siteDetailCheckboxKey}) => {
    return{
        type: SITE_DETAIL_CHECKBOX_UPDATED,
        payload: {siteDetailCheckboxKey}
    }
};


export const attemptToUploadSite = ({title, description, directions, nearestTown, accessibility, facilities, features, price, coordinate, siteImageData, alternateSites}, navigate) => {
    const {longitude, latitude} = coordinate;
    const uniqueTitle = _(`${title}${longitude}${latitude}`)
        .replace(/ /g, '')
        .slice(0,30);

    return (dispatch) => {
        firebase.firestore().doc(`campsites/${uniqueTitle}`)
            .set({
                title,
                description,
                directions,
                alternateSites,
                nearestTown,
                accessibility,
                facilities,
                features,
                price,
                coordinate,
                siteImageData
            })
            .then(() => {
                dispatch({
                    type: ADD_SITE_SUCCESS
                });

                navigate(navKeys.ADD_SITE);
            })
            .catch(error => {
                dispatch({
                    type: ADD_SITE_FAILURE,
                    payload: {error}
                });

                navigate(navKeys.ADD_SITE);
            });

    }


};
