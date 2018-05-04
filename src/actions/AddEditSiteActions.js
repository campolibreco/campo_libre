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
    ALTERNATE_SITES_TEXT_CHANGED,
    SITE_CELL_PROVIDER_CHANGED,
    SITE_CELL_STRENGTH_CHANGED,
    SITE_COUNTY_OPTION_CHANGED,
    SITE_FOREST_OPTION_CHANGED,
    SITE_MVUM_OPTION_CHANGED,
    NEW_SITE_TO_EDIT
} from './types';

import {navKeys} from '../constants';

export const updateLatitudeText = ({latitudeText, siteFormType}) => {
    return {
        type: `${siteFormType}_${LATITUDE_TEXT_UPDATED}`,
        payload: {latitudeText}
    }
};

export const updateLongitudeText = ({longitudeText, siteFormType}) => {
    return {
        type: `${siteFormType}_${LONGITUDE_TEXT_UPDATED}`,
        payload: {longitudeText}
    }
};

export const updateSiteTitleText = ({siteTitleText, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_TITLE_TEXT_CHANGED}`,
        payload: {siteTitleText}
    }
};

export const updateSiteDescriptionText = ({siteDescriptionText, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_DESCRIPTION_TEXT_CHANGED}`,
        payload: {siteDescriptionText}
    }
};

export const updateSiteDirectionsText = ({siteDirectionsText, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_DIRECTIONS_TEXT_CHANGED}`,
        payload: {siteDirectionsText}
    }
};


export const updateAlternateSitesText = ({siteAlternateSitesText, siteFormType}) => {
    return {
        type: `${siteFormType}_${ALTERNATE_SITES_TEXT_CHANGED}`,
        payload: {siteAlternateSitesText}
    }
};

export const updateSiteNearestTownText = ({siteNearestTownText, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_NEAREST_TOWN_TEXT_CHANGED}`,
        payload: {siteNearestTownText}
    }
};

export const updateAccessibilityOption = ({accessibilityOption, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_ACCESSIBILITY_OPTION_CHANGED}`,
        payload: {accessibilityOption}
    }
};

export const updatePriceOption = ({priceOption, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_PRICE_OPTION_CHANGED}`,
        payload: {priceOption}
    }
};

export const updateCountyOption = ({countyOption, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_COUNTY_OPTION_CHANGED}`,
        payload: {countyOption}
    }
};

export const updateForestOption = ({forestOption, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_FOREST_OPTION_CHANGED}`,
        payload: {forestOption}
    }
};

export const updateMVUMOption = ({mvumOption, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_MVUM_OPTION_CHANGED}`,
        payload: {mvumOption}
    }
};

export const updateCellProviderOption = ({cellProviderOption, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_CELL_PROVIDER_CHANGED}`,
        payload: {cellProviderOption}
    }
};

export const updateCellStrengthOption = ({cellStrengthOption, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_CELL_STRENGTH_CHANGED}`,
        payload: {cellStrengthOption}
    }
};

export const resetScreenFields = ({siteFormType}) => {
    return {
        type: `${siteFormType}_${ADD_SITE_FIELDS_RESET}`
    }
};

export const checkIfSiteIsReadyForUpload = ({siteFormType}) => {
    return {
        type: `${siteFormType}_${CHECK_IF_SITE_IS_READY}`
    }
};

export const siteDetailCheckboxWasClicked = ({siteDetailCheckboxKey, siteFormType}) => {
    return {
        type: `${siteFormType}_${SITE_DETAIL_CHECKBOX_UPDATED}`,
        payload: {siteDetailCheckboxKey}
    }
};

export const newSiteToEditAvailable = ({siteToEdit}) => {
    return {
        type: NEW_SITE_TO_EDIT,
        payload: {siteToEdit}
    }
};

// TODO need to fix this logic for URL and redirect
export const attemptToUploadSite = ({title, description, directions, nearestTown, accessibility, facilities, features, price, coordinate, siteImageData, alternateSites, cellProvider, cellStrength, county, forest, mvum}, navigate, siteFormType) => {
    const {longitude, latitude} = coordinate;
    const uniqueTitle = _(`${title}${longitude}${latitude}`)
        .replace(/ /g, '')
        .slice(0, 30);

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
                siteImageData,
                cellProvider,
                cellStrength,
                county,
                forest,
                mvum
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
