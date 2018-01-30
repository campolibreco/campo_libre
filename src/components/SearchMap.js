import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';

import {MapView} from 'expo';


class SearchMap extends Component {
    state = {
        region: {
            longitude: -105.727939,
            latitude: 39.695168,
            longitudeDelta: 1,
            latitudeDelta: 1
        },
        mapLoaded: false
    };

    componentDidMount() {
        Keyboard.dismiss();

        this.setState({
            mapLoaded: true
        });
    }

    render() {
        const {fillScreen} = styles;

        return (
            <View style={fillScreen}>
                {this.renderMap()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    },
    spinnerContainerStyle: {
        justifyContent: 'center'
    }
});

export default SearchMap;