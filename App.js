import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {AppLoading} from 'expo';

import {FIREBASE_CONFIG} from './env';

import {navKeys} from './src/constants';
import {common} from './src/locale.en';

import LoginScreen from './src/screens/LoginScreen';
import SearchScreen from './src/screens/SearchScreen';
import FilterScreen from './src/screens/FilterScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AddSiteScreen from './src/screens/AddSiteScreen';
import AddSiteFormScreen from './src/screens/AddSiteFormScreen';
import EditSiteScreen from './src/screens/EditSiteScreen';
import MoreScreen from './src/screens/MoreScreen';
import AuthScreen from "./src/screens/AuthScreen";
import SiteDetailScreen from "./src/screens/SiteDetailScreen";
import SiteDetailMapViewScreen from "./src/screens/SiteDetailMapViewScreen";
import SiteImageGalleryScreen from "./src/screens/SiteImageGalleryScreen";
import MVUMInspectorScreen from "./src/screens/MVUMInspectorScreen";

import {store, persistor} from './src/store';
import {blueGreenNav, linkColorBlue} from "./src/styles";

class App extends Component {
    componentWillMount() {
        firebase.initializeApp(FIREBASE_CONFIG);

        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
    }

    render() {
        const {navigatorContainerStyle} = styles;

        const MainNavigator = StackNavigator({
            [navKeys.LOGIN]: {
                screen: LoginScreen
            },
            [navKeys.AUTH]: {
                screen: AuthScreen
            },
            [navKeys.MAIN]: {
                screen: TabNavigator({
                    [navKeys.SEARCH]: {
                        screen: SearchScreen
                    },
                    [navKeys.FAVORITES]: {
                        screen: FavoritesScreen
                    },
                    [navKeys.ADD_SITE]: {
                        screen: AddSiteScreen
                    },
                    [navKeys.MORE]: {
                        screen: MoreScreen
                    }
                })
            },
            [navKeys.FILTER]: {
                screen: FilterScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            },
            [navKeys.ADD_SITE_FORM]: {
                screen: AddSiteFormScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            },[navKeys.EDIT_SITE]: {
                screen: EditSiteScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            },
            [navKeys.SITE_DETAIL]: {
                screen: SiteDetailScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            },
            [navKeys.SITE_DETAIL_MAP_VIEW]: {
                screen: SiteDetailMapViewScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            },
            [navKeys.SITE_IMAGE_GALLERY]: {
                screen: SiteImageGalleryScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            },
            [navKeys.MVUM_INSPECTOR]: {
                screen: MVUMInspectorScreen,
                navigationOptions: {
                    tabBarVisible: false
                }
            }
        }, {
            navigationOptions: {
                gesturesEnabled: false,
                headerTitleStyle: {
                    color:'white'
                },
                headerStyle: {
                    backgroundColor: blueGreenNav
                },
                headerBackTitle: common.back,
                headerBackTitleStyle: {
                    color: linkColorBlue
                },
                headerTintColor: linkColorBlue
            }
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
