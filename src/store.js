import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk/';

const store = createStore(
    reducers,
    {},
    compose(
        applyMiddleware(ReduxThunk)
    ));


export default store;