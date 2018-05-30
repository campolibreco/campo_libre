import _ from 'lodash';

import {
    ADD_SITE_SUCCESS,
    CONNECTION_INFO_UPDATED,
    FACEBOOK_LOGOUT_COMPLETE,
    SITE_ADDED_TO_PENDING_UPLOAD
} from '../actions/types';

import {connection_type, effective_connection_type} from '../constants';

const INITIAL_STATE = {
    connectionInfo: {
        connectionType: connection_type.UNKNOWN,
        effectiveConnectionType: effective_connection_type.UNKNOWN
    },
    pendingUploadSites: []
};

const pendingUploadSitesWithUploadedRemoved = ({pendingUploadSites}, {uploadedSite}) => {
    const pendingUploadSitesWithUploadedSite =  _.reject(pendingUploadSites, site => site.id === uploadedSite.id);

    return pendingUploadSitesWithUploadedSite;
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case CONNECTION_INFO_UPDATED:
            const {connectionInfo} = payload;

            return ({...state, connectionInfo});

        case SITE_ADDED_TO_PENDING_UPLOAD:
            const {newSite} = payload;

            return {...state, pendingUploadSites: state.pendingUploadSites.concat(newSite)};

        case ADD_SITE_SUCCESS:
            const {uploadedSite} = payload;
            const newPendingUploadSites = pendingUploadSitesWithUploadedRemoved(state, {uploadedSite});

            return {...state, pendingUploadSites: newPendingUploadSites};

        case FACEBOOK_LOGOUT_COMPLETE:
            return INITIAL_STATE;

        default:
            return state;
    }
}