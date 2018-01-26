import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import {TabNavigator, StackNavigator} from 'react-navigation';

import {FIREBASE_CONFIG} from './env';
import reducers from './src/reducers';

import LoginScreen from './src/screens/LoginScreen';
import MapScreen from './src/screens/MapScreen';
import ListScreen from './src/screens/ListScreen';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

import {StyleSheet, Text, View} from 'react-native';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    render() {
        const {navigatorContainerStyle} = styles;

        const MainNavigator = TabNavigator({
            login: {screen: LoginScreen},
            main: {
                screen: TabNavigator({
                    search: {
                        screen: StackNavigator({
                            map: {screen: MapScreen},
                            list: {screen: ListScreen}
                        })
                    }
                })
            }
        }, {
            lazy: true,
            navigationOptions: {
                tabBarVisible: false
            }
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
