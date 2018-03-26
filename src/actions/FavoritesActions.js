

import {
    FAVORITE_ADDED,
    FAVORITE_ADD_FAILED,
    FAVORITE_REMOVED,
    FAVORITE_REMOVE_FAILED
} from './types';

export const attemptToAddFavorite = () => {

    return async (dispatch) => {


        dispatch({
            type: FAVORITE_ADDED,
            payload: {locationServicesPermission: status}
        })
    };
};

