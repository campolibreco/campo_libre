import {Location, Permissions, ImagePicker} from 'expo';

import {
    LOCATION_SERVICES_PERMISSION_UPDATED,
    CAMERA_PERMISSION_UPDATED,
    CAMERA_ROLL_PERMISSION_UPDATED,
    CURRENT_LOCATION_UPDATED,
    ADDSITE_IMAGE_UPDATED
} from './types';

import {permissionResponses, imageSourceTypes} from '../constants';

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

const getImage = async (dispatch, imageSourceType) => {
    let result = {cancelled: true};

    if (imageSourceType === imageSourceTypes.CAMERA_ROLL) {
        console.log("In the CAMERA_ROLL area: ",imageSourceType);

        result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            // aspect: [4, 4],
            base64: true,
            quality: 0.5
        });
    } else if (imageSourceType === imageSourceTypes.CAMERA) {
        console.log("In the CAMERA area: ",imageSourceType);

        result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            // aspect: [4, 4],
            base64: true,
            quality: 0.5
        });
    }

    result.hasImage = !result.cancelled;

    return dispatch({
        type: ADDSITE_IMAGE_UPDATED,
        payload: {updatedImage: result}
    });
};

export const launchPhotoGallery = () => {
    return async (dispatch) => {
        getImage(dispatch, imageSourceTypes.CAMERA_ROLL);
    };
};


export const promptForGalleryPermission = () => {
    return async (dispatch) => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === GRANTED) {
            getImage(dispatch, imageSourceTypes.CAMERA_ROLL);
        } else {
            return dispatch({
                type: CAMERA_ROLL_PERMISSION_UPDATED,
                payload: {cameraRollPermission: status}
            })
        }
    };
};

export const launchCamera = () => {
    return async (dispatch) => {
        getImage(dispatch, imageSourceTypes.CAMERA);
    };
};

export const promptForCameraPermission = () => {

    return async (dispatch) => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA);

        if (status === GRANTED) {
            getImage(dispatch, imageSourceTypes.CAMERA);
        } else {
            return dispatch({
                type: CAMERA_PERMISSION_UPDATED,
                payload: {cameraPermission: status}
            })
        }
    };

};