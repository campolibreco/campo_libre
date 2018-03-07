import {Location, Permissions} from 'expo';

import {
    LOCATION_SERVICES_PERMISSION_UPDATED,
    CAMERA_PERMISSION_UPDATED,
    CAMERA_ROLL_PERMISSION_UPDATED,
    CURRENT_LOCATION_UPDATED
} from './types';

import {permissionResponses} from '../constants';

const {DENIED} = permissionResponses;

export const getCurrentUserLocation = () => {
    return async (dispatch) => {
        try {
            const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            const {coords: {longitude, latitude}} = location;

            return dispatch({
                type: CURRENT_LOCATION_UPDATED,
                payload: {currentLocation: {longitude, latitude}}
            })

        } catch (error) {
            return dispatch({
                type: LOCATION_SERVICES_PERMISSION_UPDATED,
                payload: {locationServicesPermission: DENIED}
            })
        }
    };

};

export const promptForLocationServicesPermission = () => {

    return async (dispatch) => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);

        dispatch({
            type: LOCATION_SERVICES_PERMISSION_UPDATED,
            payload: {locationServicesPermission: status}
        })
    };

};