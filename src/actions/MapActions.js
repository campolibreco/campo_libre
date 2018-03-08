import firebase from '@firebase/app';
import '@firebase/firestore'

import _ from 'lodash';

import {
    INITIALIZE_MAP,
    MAP_READY,
    MAP_NOT_READY,
    MAP_REGION_CHANGE,
    VIEW_STYLE_UPDATE, GUEST_TOKEN_SET
} from './types';
import {navKeys, tokens} from "../constants";


export const initializeMap = (region) => {

    return (dispatch) => {
        firebase.firestore().collection('campsites')
            .get()
            .then(querySnapshot => {
                const sites = _.map(querySnapshot.docs, (doc, index) => {
                    let preparedSite = _.clone(doc.data());
                    preparedSite.id = index;

                    return preparedSite;
                });

                dispatch({
                    type: INITIALIZE_MAP,
                    payload: {region, sites}
                });
            })
            .catch(error => {
                console.log(error);
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