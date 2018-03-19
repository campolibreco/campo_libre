import {Location, Permissions, ImagePicker} from 'expo';

import {
    LOCATION_SERVICES_PERMISSION_UPDATED,
    CAMERA_PERMISSION_UPDATED,
    CAMERA_ROLL_PERMISSION_UPDATED,
    CURRENT_LOCATION_UPDATED,
    ADDSITE_IMAGE_UPDATED
} from './types';

import {permissionResponses} from '../constants';

const {GRANTED, DENIED} = permissionResponses;

const getLocation = async (dispatch) => {

    try {
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        const {coords: {longitude, latitude}} = location;

        return dispatch({
            type: CURRENT_LOCATION_UPDATED,
            payload: {currentLocation: {longitude, latitude}}
        })

    } catch (error) {
        console.log(error);
        return dispatch({
            type: LOCATION_SERVICES_PERMISSION_UPDATED,
            payload: {locationServicesPermission: DENIED}
        })
    }

};

export const getCurrentUserLocation = () => {
    return async (dispatch) => {
        getLocation(dispatch);
    };
};

export const promptForLocationServicesPermission = () => {

    return async (dispatch) => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status === GRANTED) {
            getLocation(dispatch);
        }

        dispatch({
            type: LOCATION_SERVICES_PERMISSION_UPDATED,
            payload: {locationServicesPermission: status}
        })
    };
};

const getImageFromGallery = async (dispatch) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        base64: true,
        quality: 2
    });

    result.hasImage = !result.cancelled;

    return dispatch({
        type: ADDSITE_IMAGE_UPDATED,
        payload: {updatedImage: result}
    });
};

export const launchPhotoGallery = () => {
    return async (dispatch) => {
        getImageFromGallery(dispatch);
    };
};


export const promptForGalleryPermission = () => {
    return async (dispatch) => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === GRANTED) {
            getImageFromGallery(dispatch);
        } else {
           return dispatch({
                type: CAMERA_ROLL_PERMISSION_UPDATED,
                payload: {cameraRollPermission: status}
            })
        }
    };
};