import {
    LOCATION_SERVICES_PERMISSION_UPDATED,
    CAMERA_ROLL_PERMISSION_UPDATED,
    CAMERA_PERMISSION_UPDATED
} from '../actions/types';

import {permissionResponses} from '../constants';

import {permissions} from '../locale.en'

const {GRANTED, DENIED, UNDETERMINED} = permissionResponses;

const INITIAL_STATE = {
    locationServicesPermission: UNDETERMINED,
    cameraPermission: UNDETERMINED,
    cameraRollPermission: UNDETERMINED
};

const letUserKnowWeNeedLocationServices = () => {
    alert(permissions.reminder_for_ls_access);
};

const letUserKnowWeNeedCameraRollAccess = () => {
    alert(permissions.reminder_for_camera_roll_access);
};

const letUserKnowWeNeedCameraAccess = () => {
    alert(permissions.reminder_for_camera_access);
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case LOCATION_SERVICES_PERMISSION_UPDATED:
            const {locationServicesPermission} = payload;

            if (locationServicesPermission !== GRANTED) {
                letUserKnowWeNeedLocationServices()
            }

            return ({...state, locationServicesPermission});

        case CAMERA_ROLL_PERMISSION_UPDATED:
            const {cameraRollPermission} = payload;

            if (cameraRollPermission !== GRANTED) {
                letUserKnowWeNeedCameraRollAccess()
            }

            return ({...state, cameraRollPermission});


        case CAMERA_PERMISSION_UPDATED:
            const {cameraPermission} = payload;

            if (cameraPermission !== GRANTED) {
                letUserKnowWeNeedCameraAccess()
            }

            return ({...state, cameraPermission});


        default:
            return state;
    }
}