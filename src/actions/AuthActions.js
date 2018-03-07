import {Facebook} from 'expo';
import axios from 'axios';
import firebase from 'firebase';

import {
    APP_READY,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILURE,
    FACEBOOK_LOGOUT_COMPLETE,
    GUEST_TOKEN_SET
} from './types';

import {FACEBOOK_AUTH, FIREBASE_USER_PASSWORD} from '../../env';
import {tokens, navKeys} from '../constants';

import {persistor} from '../store';

const userLoginSuccess = (dispatch, email, navigate) => {
    dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: {token: email, appReady: false}
    });

    navigate(navKeys.SEARCH);
};

const userLoginFailure = (dispatch, navigate) => {
    dispatch({
        type: FACEBOOK_LOGIN_FAILURE
    });

    navigate(navKeys.LOGIN);
};

const attemptFacebookLogin = async ({dispatch, navigate}) => {
    const {appID} = FACEBOOK_AUTH;
    const faceBookOptions = {
        permissions: ['public_profile', 'email']
    };

    let {type, token} = await Facebook.logInWithReadPermissionsAsync(appID, faceBookOptions);

    if (type === 'success') {
        let {data: {email, name, picture: {data: {url}}}} = await axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);

        firebase.auth().signInWithEmailAndPassword(email, FIREBASE_USER_PASSWORD)
            .then(user => {
                userLoginSuccess(dispatch, email, navigate);
            })
            .catch(err => {
                const errorCode = err.code;

                if (errorCode === 'auth/user-not-found') {
                    firebase.auth().createUserWithEmailAndPassword(email, FIREBASE_USER_PASSWORD)
                        .then(user => {
                            userLoginSuccess(dispatch, email, navigate);
                        })
                        .catch(err => {
                            console.log("Error creating user: ", err);
                            userLoginFailure(dispatch, navigate);
                        })

                } else {
                    userLoginFailure(dispatch, navigate);
                }
            })

    } else {
        userLoginFailure(dispatch, navigate);
    }
};

export const logUserIntoFacebook = ({navigate}) => {

    return async (dispatch) => {
        navigate(navKeys.AUTH);

        attemptFacebookLogin({dispatch, navigate});
    }
};

export const checkAndSetToken = ({token, navigate}) => {

    return async (dispatch) => {

        if (token) {
            if (token === tokens.GUEST) {
                dispatch({
                    type: GUEST_TOKEN_SET,
                    payload: {token, appReady: false}
                });
            } else {
                dispatch({
                    type: FACEBOOK_LOGIN_SUCCESS,
                    payload: {token, appReady: false}
                })
            }

            navigate(navKeys.SEARCH);
        } else {
            dispatch({
                type: APP_READY
            })
        }
    }
};

export const setGuestToken = ({navigate}) => {

    return async (dispatch) => {

        dispatch({
            type: GUEST_TOKEN_SET,
            payload: {token: tokens.GUEST, appReady: false}
        });

        navigate(navKeys.SEARCH);
    };
};

export const logUserOutOfFacebook = ({navigate}) => {
    return async (dispatch) => {

        // purge all async persisted state
        await persistor.purge();

        dispatch({
            type: FACEBOOK_LOGOUT_COMPLETE
        });

        navigate(navKeys.LOGIN);
    };
};
