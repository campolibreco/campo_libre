import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';

export default combineReducers({
    auth: AuthReducer,
    map: MapReducer
});