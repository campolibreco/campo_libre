import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';
import _ from 'lodash';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_AUTH_ERROR,
    LOGIN_SUCCESS
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginAuthError = (dispatch, err) => {
    dispatch({
        type: LOGIN_AUTH_ERROR,
        payload: err
    });
};

export const loginSuccess = (dispatch) => {
    dispatch({
        type: LOGIN_SUCCESS
    });

    Actions.hidden({type: 'reset'});
    Actions.tabbar();
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(_.trim(email), _.trim(password))
            .then(user => {
                loginSuccess(dispatch)
            })
            .catch(err => {
                loginAuthError(dispatch, err);
            })
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then((user) => {
                console.log("Logged the user out", user)
                Actions.login();
            })
    }
}