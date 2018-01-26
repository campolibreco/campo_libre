import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';

import {MapView} from 'expo';


import {CardSection, Card} from '../components/common/index';

class MapScreen extends Component {
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

    static renderNavButton = (navigate) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title="List"
                    onPress={() => navigate('list')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: 'Map',
            headerTitle: 'Find a Site',
            headerLeft: MapScreen.renderNavButton(navigate)
        }

    };

    renderMap = () => {
        const {fillScreen, spinnerContainerStyle} = styles;

        if (this.state.mapLoaded) {
            return (
                <MapView
                    style={fillScreen}
                    region={this.state.region}
                />
            )
        } else {
            return (
                <View style={[fillScreen, spinnerContainerStyle]}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }

    };

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

export default MapScreen;