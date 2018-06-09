import {AsyncStorage} from 'react-native';

import firebase from 'firebase';
import 'firebase/firestore'

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
    NEW_SITE_TO_EDIT,
    GIVE_ME_CREDIT_TOGGLE_UPDATED,
    SITE_ADDED_TO_PENDING_UPLOAD,
    SITE_UPLOAD_IN_PROGRESS,
    EDIT_SITE_FAILURE,
    EDIT_SITE_SUCCESS,
    APPROVE_SITE_SUCCESS,
    APPROVE_SITE_FAILURE,
    REJECT_SITE_SUCCESS,
    REJECT_SITE_FAILURE,
    DELETE_SITE_FAILURE
} from './types';

import {navKeys, site_form_type, campsite_collections, approval_state} from '../constants';

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

export const giveMeCreditToggleUpdated = ({newGiveMeCreditValue, siteFormType}) => {
    return {
        type: `${siteFormType}_${GIVE_ME_CREDIT_TOGGLE_UPDATED}`,
        payload: {newGiveMeCreditValue}
    }
};

const attemptToUploadSite = ({approvalState, title, description, directions, nearestTown, accessibility, facilities, features, price, coordinate, siteImageData, alternateSites, cellProvider, cellStrength, county, forest, mvum, uploadedBy}, {navigate, goBack}, {correctCollection, uniqueTitle}) => {

    return firebase.firestore().doc(`${correctCollection}/${uniqueTitle}`)
        .set({
            approvalState,
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
            mvum,
            uploadedBy
        });
};

const attemptToDeleteSite = ({collectionToDeleteFrom, uniqueTitle}) => {

    return firebase.firestore().doc(`${collectionToDeleteFrom}/${uniqueTitle}`)
        .delete();
};

const createUniqueTitle = ({title, coordinate: {longitude, latitude}}) => {

    const uniqueTitle = _(`${title}${longitude}${latitude}`)
        .replace(/[\W_]+/g, '')
        .slice(0, 30);

    return uniqueTitle;
};

export const attemptToUploadNewSite = (newSite, {navigate, goBack}, {currentUser}) => {
    const correctCollection = currentUser.isAdmin ? campsite_collections.APPROVED : campsite_collections.PENDING;
    const approvalState = correctCollection === campsite_collections.APPROVED ? approval_state.APPROVED : approval_state.PENDING_APPROVAL;

    const contextOptions = {
        correctCollection,
        uniqueTitle: newSite.id
    };

    newSite.approvalState = approvalState;

    return (dispatch) => {
        dispatch({
            type: SITE_UPLOAD_IN_PROGRESS
        });

        return attemptToUploadSite(newSite, {navigate, goBack}, contextOptions)
            .then(() => {
                dispatch({
                    type: ADD_SITE_SUCCESS,
                    payload: {uploadedSite: newSite}
                });

                navigate(navKeys.ADD_SITE);
            })
            .catch(error => {
                dispatch({
                    type: ADD_SITE_FAILURE,
                    payload: {error}
                });
            });

    }


};

export const addNewSiteToPendingUploadQueue = (newSite, {navigate, goBack}) => {

    return (dispatch) => {
        navigate(navKeys.ADD_SITE);
        newSite.approvalState = approval_state.PENDING_UPLOAD;

        newSite.id = createUniqueTitle(newSite);

        return AsyncStorage.setItem(newSite.id, newSite.siteImageData)
            .then(result => {
                dispatch({
                    type: SITE_ADDED_TO_PENDING_UPLOAD,
                    payload: {newSite}
                });
            });

    }

};

export const attemptToEditExistingSite = (newSite, {navigate, goBack}, {currentUser}) => {
    if (!currentUser || !currentUser.isAdmin) {
        return;
    }

    const correctCollection = campsite_collections.APPROVED;

    const contextOptions = {
        correctCollection,
        uniqueTitle: newSite.id
    };

    return (dispatch) => {
        return attemptToUploadSite(newSite, {navigate, goBack}, contextOptions)
            .then(() => {
                dispatch({
                    type: EDIT_SITE_SUCCESS,
                    payload: {error}
                });

                goBack();
            })
            .catch(error => {
                dispatch({
                    type: EDIT_SITE_FAILURE,
                    payload: {error}
                });

                goBack();
            });

    }
};

export const attemptToAcceptSubmittedSite = (siteToAccept, {navigate, goBack}, {currentUser}) => {
    if (!currentUser || !currentUser.isAdmin) {
        return;
    }

    siteToAccept.approvalState = approval_state.APPROVED;

    const correctCollection = campsite_collections.APPROVED;
    const newUniqueTitleForSite = createUniqueTitle(siteToAccept);

    const contextOptions = {
        correctCollection,
        uniqueTitle: newUniqueTitleForSite
    };

    return (dispatch) => {
        return attemptToUploadSite(siteToAccept, {navigate, goBack}, contextOptions)
            .then(() => {
                const collectionToDeleteFrom = campsite_collections.PENDING;

                attemptToDeleteSite({collectionToDeleteFrom, uniqueTitle: siteToAccept.id})
                    .then(() => {
                        dispatch({
                            type: APPROVE_SITE_SUCCESS
                        });

                        navigate(navKeys.ADD_SITE);
                    })
                    .catch(error => {
                        dispatch({
                            type: DELETE_SITE_FAILURE,
                            payload: {error}
                        });

                        goBack();
                    })
            })
            .catch(error => {
                dispatch({
                    type: APPROVE_SITE_FAILURE,
                    payload: {error}
                });
                goBack();
            });
    }

};

export const attemptToRejectSite = (siteToReject, {navigate, goBack}, {currentUser}) => {

    if (!currentUser || !currentUser.isAdmin) {
        return;
    }

    siteToReject.approvalState = approval_state.REJECTED;

    const correctCollection = campsite_collections.REJECTED;

    const newUniqueTitleForSite = createUniqueTitle(siteToReject);

    const contextOptions = {
        correctCollection,
        uniqueTitle: newUniqueTitleForSite
    };

    return (dispatch) => {
        return attemptToUploadSite(siteToReject, {navigate, goBack}, contextOptions)
            .then(() => {
                const collectionToDeleteFrom = campsite_collections.PENDING;

                attemptToDeleteSite({collectionToDeleteFrom, uniqueTitle: siteToReject.id})
                    .then(() => {
                        dispatch({
                            type: REJECT_SITE_SUCCESS
                        });

                        navigate(navKeys.ADD_SITE);
                    })
                    .catch(error => {
                        dispatch({
                            type: DELETE_SITE_FAILURE,
                            payload: {error}
                        });

                        goBack();
                    })
            })
            .catch(error => {
                dispatch({
                    type: REJECT_SITE_FAILURE,
                    payload: {error}
                });
                goBack();
            });
    }

};

