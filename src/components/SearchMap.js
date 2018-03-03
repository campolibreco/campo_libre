// 3rd party libraries - core
import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {MapView} from 'expo';

const {Marker} = MapView;
// 3rd party libraries - additional
import _ from 'lodash';


// styles and language

// our components - core
// our components - additional

const SearchMap = ({mapLoaded, lastKnownRegion, updateRegion, sites}) => {
    const {fillScreen, spinnerContainerStyle} = styles;


    const renderSites = () => {
        const renderedSites =  _.map(sites, site => {
            const {title, description, coordinate, id} = site;

            return (
                <Marker
                    key={id}
                    title={title}
                    description={description}
                    coordinate={coordinate}
                />
            );
        });

        return renderedSites;
    };

    const renderMap = () => {
        if (mapLoaded) {
            return (
                <MapView
                    style={fillScreen}
                    initialRegion={lastKnownRegion}
                    onRegionChangeComplete={updateRegion}
                    rotateEnabled={false}
                >

                    {renderSites()}

                </MapView>
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

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    },
    spinnerContainerStyle: {
        justifyContent: 'center'
    }
});

export default SearchMap;