import firebase from '@firebase/app';
import '@firebase/firestore'

import {
    FAVORITE_ADDED,
    FAVORITE_ADD_FAILED,
    FAVORITE_REMOVED,
    FAVORITE_REMOVE_FAILED
} from './types';
import {navKeys} from "../constants";

export const attemptToAddFavorite = ({selectedSite, currentUser}) => {

    return async (dispatch) => {
        const favoriteMetadata = {
            title: selectedSite.title,
            id: selectedSite.id,
        };

        return firebase.firestore().doc(`users/${currentUser.email}/favorites/${selectedSite.title}`)
            .set(favoriteMetadata)
            .then(() => {
                dispatch({
                    type: FAVORITE_ADDED,
                    payload: {favoriteToAdd: selectedSite}
                });
            })
            .catch(error => {
                dispatch({
                    type: FAVORITE_ADD_FAILED,
                    payload: {error}
                });

            });
    };
};



