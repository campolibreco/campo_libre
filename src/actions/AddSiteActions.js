import firebase from '@firebase/app';
import '@firebase/firestore'

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
    ADD_SITE_FIELDS_RESET,
    ADD_SITE_SUCCESS,
    ADD_SITE_FAILURE,
    CHECK_IF_SITE_IS_READY
} from './types';

export const openSiteUploadModal = () => {
    return {
        type: OPEN_SITE_UPLOAD_MODAL
    }
};

export const closeSiteUploadModal = () => {
    return {
        type: CLOSE_SITE_UPLOAD_MODAL
    }
};

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


export const attemptToUploadSite = ({title, description, directions, nearestTown, accessibility, facilities, coordinate}) => {
    const {longitude, latitude} = coordinate;
    const uniqueTitle = `${title}${longitude}${latitude}`;

    return (dispatch) => {
        firebase.firestore().doc(`campsites/${uniqueTitle}`)
            .set({
                title,
                description,
                directions,
                nearestTown,
                accessibility,
                facilities,
                coordinate
            })
            .then(() => {
                dispatch({
                    type: ADD_SITE_SUCCESS
                });
            })
            .catch(error => {
                dispatch({
                    type: ADD_SITE_FAILURE,
                    payload: {error}
                });
            });

    }


};