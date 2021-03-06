import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import AddEditSiteReducer from './AddEditSiteReducer';
import PermissionsReducer from './PermissionsReducer';
import FavoritesReducer from './FavoritesReducer';
import NetworkReducer from './NetworkReducer';

export default combineReducers({
    auth: AuthReducer,
    map: MapReducer,
    addEditSite: AddEditSiteReducer,
    permissions: PermissionsReducer,
    favorites: FavoritesReducer,
    network: NetworkReducer
});