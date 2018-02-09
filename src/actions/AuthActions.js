import {Facebook} from 'expo';

import _ from 'lodash';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGIN_LOGOUT
} from './types';

import {FACEBOOK_AUTH} from '../../env';

export const logUserIntoFacebook = (dispatch) => {
    const {appID} = FACEBOOK_AUTH;
    const faceBookOptions = {
        permissions: 'public_profile'
    };

    Facebook.logInWithReadPermissionsAsync(appID, faceBookOptions)
        .then((result) =>{
            console.log("FB response: ", result);
        })

};