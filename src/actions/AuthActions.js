import {AsyncStorage} from 'react-native';
import {Facebook} from 'expo';
import axios from 'axios';

import _ from 'lodash';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGIN_LOGOUT
} from './types';

import {FACEBOOK_AUTH} from '../../env';

const attemptFacebookLogin = async (dispatch) => {
    const {appID} = FACEBOOK_AUTH;
    const faceBookOptions = {
        permissions: ['public_profile']
    };

    let {type, token} = await Facebook.logInWithReadPermissionsAsync(appID, faceBookOptions);

    if (type === 'success') {
        let {data: {email, name, picture: {data: {url}}}} = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
        // we now have access to email, name, and their profile picture

        await AsyncStorage.setItem('fb_token', token);

        dispatch({
            type: FACEBOOK_LOGIN_SUCCESS,
            payload: token
        })
    } else {
        dispatch({
            type: FACEBOOK_LOGIN_FAILURE
        })
    }
};

export const logUserIntoFacebook = () => {

    return async (dispatch) => {
        let token = await AsyncStorage.getItem('fb_token');

        if (token) {
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: token
            })
        } else {
            attemptFacebookLogin(dispatch);
        }
    }

};
