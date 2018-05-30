import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import ReduxThunk from 'redux-thunk/';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

const persistConfig = {
    key: 'root',
    storage: storage,
    // autoMergeLevel1 is the default anyway, but I want to be explicit
    stateReconciler: autoMergeLevel1,
    whitelist: ['auth', 'map', 'addEditSite', 'network']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    {},
    compose(
        applyMiddleware(ReduxThunk)
    ));

export const persistor = persistStore(store);




