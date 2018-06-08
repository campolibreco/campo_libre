import {NetInfo} from 'react-native';

import _ from 'lodash';

import {

    CONNECTION_INFO_UPDATED
} from './types';


const getCurrentConnectionInfo = ({dispatch}) => {
    return NetInfo.getConnectionInfo().then((connectionInfo) => {

        dispatch({
            type: CONNECTION_INFO_UPDATED,
            payload: {connectionInfo}
        });

    });

};

const destroyConnectionListener = (connectionInfo) => {
    NetInfo.removeEventListener(
        'connectionChange',
        getCurrentConnectionInfo
    );
};

export const checkCurrentConnectionInfo = () => {
    return (dispatch) => {
        getCurrentConnectionInfo({dispatch})
    }
};

export const setUpConnectionListener = () => {
    return (dispatch) => {

        NetInfo.addEventListener(
            'connectionChange',
            () => getCurrentConnectionInfo({dispatch})
        );

    }
};

