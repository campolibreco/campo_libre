import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import AddSiteReducer from './AddSiteReducer';

export default combineReducers({
    auth: AuthReducer,
    map: MapReducer,
    addSite: AddSiteReducer
});