import {
    CONNECTION_INFO_UPDATED
} from '../actions/types';

import {connection_type, effective_connection_type} from '../constants';

const INITIAL_STATE = {
    connectionInfo: {
        connectionType: connection_type.UNKNOWN,
        effectiveConnectionType: effective_connection_type.UNKNOWN
    }
};

export default (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch (type) {

        case CONNECTION_INFO_UPDATED:
            const {connectionInfo} = payload;

            return ({...state, connectionInfo});

        default:
            return state;
    }
}