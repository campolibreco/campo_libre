import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import {
    LOCATION_SERVICES_PERMISSION_UPDATED,
    CAMERA_PERMISSION_UPDATED,
    CAMERA_ROLL_PERMISSION_UPDATED,
    CURRENT_LOCATION_UPDATED,
    ADDSITE_IMAGE_UPDATED
} from './types';

import {permissionResponses, imageSourceTypes} from '../constants';

const {GRANTED, DENIED} = permissionResponses;

const getLocation = async ({dispatch, siteFormType}) => {

    try {
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        const {coords: {longitude, latitude}} = location;

        return dispatch({
            type: `${siteFormType}_${CURRENT_LOCATION_UPDATED}`,
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

export const getCurrentUserLocation = ({siteFormType}) => {
    return async (dispatch) => {
        getLocation({dispatch, siteFormType});
    };
};

export const promptForLocationServicesPermission = ({siteFormType}) => {

    return async (dispatch) => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if (status === GRANTED) {
            getLocation({dispatch, siteFormType});
        }

        dispatch({
            type: LOCATION_SERVICES_PERMISSION_UPDATED,
            payload: {locationServicesPermission: status}
        })
    };
};

const getImage = async ({dispatch, imageSourceType, siteFormType}) => {
    let result = {cancelled: true};

    if (imageSourceType === imageSourceTypes.CAMERA_ROLL) {

        result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            quality: 0.4
        });
    } else if (imageSourceType === imageSourceTypes.CAMERA) {

        result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            base64: true,
            quality: 0.4
        });
    }

    result.hasImage = !result.cancelled;

    return dispatch({
        type: `${siteFormType}_${ADDSITE_IMAGE_UPDATED}`,
        payload: {updatedImage: result}
    });
};

export const launchPhotoGallery = ({siteFormType}) => {
    return async (dispatch) => {
        getImage({dispatch, imageSourceType: imageSourceTypes.CAMERA_ROLL, siteFormType});
    };
};


export const promptForGalleryPermission = ({siteFormType}) => {
    return async (dispatch) => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status === GRANTED) {
            getImage({dispatch, imageSourceType: imageSourceTypes.CAMERA_ROLL, siteFormType});
        } else {
            return dispatch({
                type: CAMERA_ROLL_PERMISSION_UPDATED,
                payload: {cameraRollPermission: status}
            })
        }
    };
};

export const launchCamera = ({siteFormType}) => {
    return async (dispatch) => {
        getImage({dispatch, imageSourceType: imageSourceTypes.CAMERA, siteFormType});
    };
};

export const promptForCameraPermission = ({siteFormType}) => {

    return async (dispatch) => {
        let {status} = await Permissions.askAsync(Permissions.CAMERA);

        if (status === GRANTED) {
            getImage({dispatch, imageSourceType: imageSourceTypes.CAMERA, siteFormType});
        } else {
            return dispatch({
                type: CAMERA_PERMISSION_UPDATED,
                payload: {cameraPermission: status}
            })
        }
    };

};