import {combineReducers} from 'redux';

import AuthReducer from './AuthReducer';
import MapReducer from './MapReducer';
import AddSiteReducer from './AddSiteReducer';
import PermissionsReducer from './PermissionsReducer';
import FavoritesReducer from './FavoritesReducer';

export default combineReducers({
    auth: AuthReducer,
    map: MapReducer,
    addSite: AddSiteReducer,
    permissions: PermissionsReducer,
    favorites: FavoritesReducer
});