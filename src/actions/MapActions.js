import firebase from '@firebase/app';
import '@firebase/firestore'

import _ from 'lodash';

import {
    INITIALIZE_MAP,
    MAP_IS_INITIALIZING,
    MAP_READY,
    MAP_REGION_CHANGE,
    VIEW_STYLE_UPDATE,
    SELECTED_SITE_UPDATE,
    SELECTED_SITE_CLEARED
} from './types';

import {navKeys} from '../constants';

export const initializeMap = ({region}) => {

    return (dispatch) => {
        dispatch({
            type: MAP_IS_INITIALIZING
        });

        firebase.firestore().collection('campsites')
            .onSnapshot(querySnapshot => {
                const sites = _.map(querySnapshot.docs, (doc, index) => {
                    let preparedSite = _.clone(doc.data());
                    preparedSite.id = doc.id;

                    return preparedSite;
                });

                dispatch({
                    type: INITIALIZE_MAP,
                    payload: {region, sites}
                });
            });

    };
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
        payload: newRegion
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