import {AsyncStorage} from 'react-native';
import {Facebook} from 'expo';
import axios from 'axios';

import _ from 'lodash';

import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGOUT_COMPLETE,
    GUEST_TOKEN_SET
} from './types';

import {FACEBOOK_AUTH} from '../../env';
import {tokens} from '../constants';

const attemptFacebookLogin = async (dispatch) => {
    const {appID} = FACEBOOK_AUTH;
    const faceBookOptions = {
        permissions: ['public_profile']
    };

    let {type, token} = await Facebook.logInWithReadPermissionsAsync(appID, faceBookOptions);

    if (type === 'success') {
        let {data: {email, name, picture: {data: {url}}}} = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
        // we now have access to email, name, and their profile picture

        await AsyncStorage.setItem(tokens.USER_TOKEN, token);

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
        let token = await AsyncStorage.getItem(tokens.USER_TOKEN);

        if (token) {
            checkAndSetToken(token);
        } else {
            attemptFacebookLogin(dispatch);
        }
    }

};

export const checkAndSetToken = (passedToken) => {

    return async (dispatch) => {
        let token = passedToken;

        if (!token) {
            token = await AsyncStorage.getItem(tokens.USER_TOKEN);
        }

        if (token) {
            dispatch({
                type: FACEBOOK_LOGIN_SUCCESS,
                payload: token
            })
        }
    }
};

export const setGuestToken = () => {

    return async (dispatch) =>{
        await AsyncStorage.setItem(tokens.USER_TOKEN, tokens.GUEST);

        dispatch({
            type: GUEST_TOKEN_SET,
            payload: tokens.GUEST
        });
    };
};

export const logUserOutOfFacebook = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem(tokens.USER_TOKEN);

        dispatch({
            type: FACEBOOK_LOGOUT_COMPLETE
        });
    };
};
