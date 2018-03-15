import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {AppLoading} from 'expo';

import {FIREBASE_CONFIG} from './env';

import {navKeys} from './src/constants';

import LoginScreen from './src/screens/LoginScreen';
import SearchScreen from './src/screens/SearchScreen';
import FilterScreen from './src/screens/FilterScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AddSiteScreen from './src/screens/AddSiteScreen';
import AddSiteFormScreen from './src/screens/AddSiteFormScreen';
import MoreScreen from './src/screens/MoreScreen';
import AuthScreen from "./src/screens/AuthScreen";

import {store, persistor} from './src/store';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    render() {
        const {navigatorContainerStyle} = styles;

        const MainNavigator = StackNavigator({
            [navKeys.LOGIN]: {
                screen: LoginScreen,
                navigationOptions: {
                    gesturesEnabled: false,
                }
            },
            [navKeys.AUTH]: {
                screen: AuthScreen,
                navigationOptions: {
                    gesturesEnabled: false,
                }
            },
            [navKeys.MAIN]: {
                screen: TabNavigator({
                    [navKeys.SEARCH]: {
                        screen: SearchScreen,
                        navigationOptions: {
                            gesturesEnabled: false,
                        }
                    },
                    [navKeys.FAVORITES]: {
                        screen: FavoritesScreen,
                        navigationOptions: {
                            gesturesEnabled: false,
                        }
                    },
                    [navKeys.ADD_SITE]: {
                        screen: AddSiteScreen,
                        navigationOptions: {
                            gesturesEnabled: false,
                        }
                    },
                    [navKeys.MORE]: {
                        screen: MoreScreen,
                        navigationOptions: {
                            gesturesEnabled: false,
                        }
                    }
                })
            },
            [navKeys.FILTER]: {
                screen: FilterScreen,
                navigationOptions: {
                    tabBarVisible: false,
                    gesturesEnabled: false,
                }
            },
            [navKeys.ADD_SITE_FORM]: {
                screen: AddSiteFormScreen,
                navigationOptions: {
                    tabBarVisible: false,
                    gesturesEnabled: false,
                }
            }
        }, {
            lazy: true
        });

        return (
            <Provider store={store}>
                <PersistGate loading={<AppLoading/>} persistor={persistor}>
                    <MainNavigator/>
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({});

export default App;
