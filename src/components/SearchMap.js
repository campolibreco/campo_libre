// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {MapView} from 'expo';
import {Button} from 'react-native-elements';
// 3rd party libraries - additional

// styles and language

// our components - core
// our components - additional

const searchMap = ({mapLoaded, region, updateRegion}) => {
    const {fillScreen, spinnerContainerStyle} = styles;

    const newRegionIsAcceptable = (newRegion) => {
        const {longitude, latitude, latitudeDelta, longitudeDelta} = newRegion;

        const notZoomedTooFarOut = latitudeDelta < 60 && longitudeDelta < 60;
        const isNotSF = (Math.abs(longitude - 122.409) > 1) && (Math.abs(latitude - 37.787) > 1);

        return isNotSF && notZoomedTooFarOut;
    };

    const onRegionChange = (newRegion) => {

        if (!newRegionIsAcceptable(newRegion)) {
            return;
        }

        updateRegion(newRegion);
    };

    const renderMap = () => {
        if (mapLoaded) {
            return (
                <MapView
                    style={fillScreen}
                    region={region}
                    onRegionChange={onRegionChange}
                    rotateEnabled={false}
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

    return (
        <View style={fillScreen}>
            {renderMap()}
        </View>
    );

};

const styles = {
    fillScreen: {
        flex: 1
    },
    spinnerContainerStyle: {
        justifyContent: 'center'
    }
};

export default searchMap;