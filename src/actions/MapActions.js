import firebase from 'firebase';
import 'firebase/firestore'

import _ from 'lodash';

import {
    INITIALIZE_MAP,
    PENDING_SITES_UPDATE,
    MAP_IS_INITIALIZING,
    MAP_READY,
    MAP_REGION_CHANGE,
    VIEW_STYLE_UPDATE,
    SELECTED_SITE_UPDATE,
    SELECTED_SITE_CLEARED,
    PENDING_SELECTED_SITE_UPDATE,
    PENDING_SITES_UNSUBSCRIBE_READY,
    APPROVED_SITES_UNSUBSCRIBE_READY
} from './types';

import {navKeys, tokens} from '../constants';

export const initializeMap = ({region}) => {

    return (dispatch) => {
        dispatch({
            type: MAP_IS_INITIALIZING
        });

        const unsubscribeApprovedCampsitesSnapshot = firebase.firestore().collection('campsites')
            .onSnapshot(querySnapshot => {
                const sites = _.map(querySnapshot.docs, (doc, index) => {
                    let preparedSite = _.clone(doc.data());
                    preparedSite.id = doc.id;
                    preparedSite.key = preparedSite.id;

                    return preparedSite;
                });

                dispatch({
                    type: INITIALIZE_MAP,
                    payload: {region, sites}
                });
            }, (err) => {
                console.log(err);
            });

        dispatch({
            type: APPROVED_SITES_UNSUBSCRIBE_READY,
            payload: {unsubscribeApprovedCampsitesSnapshot}
        });


    };
};

export const getPendingCampsites = ({currentUser}) => {

    return (dispatch) => {


        if (currentUser.name === tokens.GUEST) {
            dispatch({
                type: PENDING_SITES_UNSUBSCRIBE_READY,
                payload: {unsubscribePendingCampsitesSnapshot: _.noop}
            });
        }
        else if (currentUser.isAdmin) {
            const unsubscribePendingCampsitesSnapshot = firebase.firestore().collection('pending_campsites')
                .onSnapshot(querySnapshot => {
                    const pendingSites = _.map(querySnapshot.docs, (doc, index) => {
                        let preparedSite = _.clone(doc.data());
                        preparedSite.id = doc.id;
                        preparedSite.key = preparedSite.id;

                        return preparedSite;
                    });

                    dispatch({
                        type: PENDING_SITES_UPDATE,
                        payload: {pendingSites}
                    });
                }, (err) => {
                    console.log(err);
                });

            dispatch({
                type: PENDING_SITES_UNSUBSCRIBE_READY,
                payload: {unsubscribePendingCampsitesSnapshot}
            });

        } else {


            const unsubscribePendingCampsitesSnapshot = firebase.firestore().collection('pending_campsites').where('uploadedBy.email', '==', `${currentUser.email}`)
                .onSnapshot(querySnapshot => {
                    const pendingSites = _.map(querySnapshot.docs, (doc, index) => {
                        let preparedSite = _.clone(doc.data());
                        preparedSite.id = doc.id;
                        preparedSite.key = preparedSite.id;

                        return preparedSite;
                    });

                    dispatch({
                        type: PENDING_SITES_UPDATE,
                        payload: {pendingSites}
                    });
                }, (err) => {
                    console.log(err);
                });

            dispatch({
                type: PENDING_SITES_UNSUBSCRIBE_READY,
                payload: {unsubscribePendingCampsitesSnapshot}
            });

        }

    }
};

export const updateViewStyle = (newViewStyle) => {
    return {
        type: VIEW_STYLE_UPDATE,
        payload: newViewStyle

    };
};

export const mapHasLoaded = () => {
    return {
        type: MAP_READY
    }
};

export const updateRegion = (newRegion) => {
    return {
        type: MAP_REGION_CHANGE,
        payload: {newRegion}
    }
};

export const getSiteDetail = ({selectedSite, navigate}) => {
    if (navigate) {
        navigate(navKeys.SITE_DETAIL);
    }

    if (selectedSite) {
        return {
            type: SELECTED_SITE_UPDATE,
            payload: {selectedSite}
        }
    } else {
        return {
            type: SELECTED_SITE_CLEARED
        }
    }

};

export const getPendingSiteDetail = ({selectedSite, navigate}) => {
    navigate(navKeys.SITE_DETAIL);

    return {
        type: PENDING_SELECTED_SITE_UPDATE,
        payload: {selectedSite}
    }
};