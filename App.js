import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {TabNavigator, StackNavigator} from 'react-navigation';

import {FIREBASE_CONFIG} from './env';
import reducers from './src/reducers';

import LoginScreen from './src/screens/LoginScreen';
import SearchScreen from './src/screens/SearchScreen';
import FilterScreen from './src/screens/FilterScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AddSiteScreen from './src/screens/AddSiteScreen';
import MoreScreen from './src/screens/MoreScreen';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

import {StyleSheet, Text, View} from 'react-native';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    render() {
        const {navigatorContainerStyle} = styles;

        const MainNavigator = StackNavigator({
            login: {
                screen: LoginScreen
            },
            main: {
                screen: TabNavigator({
                    search: {screen: SearchScreen},
                    favorites: {screen: FavoritesScreen},
                    addSite: {screen: AddSiteScreen},
                    more: {screen: MoreScreen}
                })
            },
            filter: {
                screen: FilterScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            }
        }, {
            lazy: true
        });

        return (
            <Provider store={store}>
                <MainNavigator/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({});

export default App;
