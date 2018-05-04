import firebase from '@firebase/app';
import '@firebase/firestore'

import {
    FAVORITE_ADDED,
    FAVORITE_ADD_FAILED,
    FAVORITE_REMOVED,
    FAVORITE_REMOVE_FAILED
} from './types';

export const attemptToAddFavorite = ({favoriteSiteToAdd, currentUser}) => {

    return async (dispatch) => {
        const favoriteMetadata = {
            title: favoriteSiteToAdd.title,
            id: favoriteSiteToAdd.id,
        };

        return firebase.firestore().doc(`users/${currentUser.email}/favorites/${favoriteSiteToAdd.title}`)
            .set(favoriteMetadata)
            .then(() => {
                dispatch({
                    type: FAVORITE_ADDED,
                    payload: {favoriteToAdd: favoriteSiteToAdd}
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


export const attemptToRemoveFavorite = ({favoriteSiteToRemove, currentUser}) => {

    return async (dispatch) => {
        const favoriteMetadata = {
            title: favoriteSiteToRemove.title,
            id: favoriteSiteToRemove.id,
        };

        return firebase.firestore().doc(`users/${currentUser.email}/favorites/${favoriteSiteToRemove.title}`)
            .delete()
            .then(() => {
                dispatch({
                    type: FAVORITE_REMOVED,
                    payload: {favoriteToRemove: favoriteSiteToRemove}
                });
            })
            .catch(error => {
                dispatch({
                    type: FAVORITE_REMOVE_FAILED,
                    payload: {error}
                });

            });
    };
};


