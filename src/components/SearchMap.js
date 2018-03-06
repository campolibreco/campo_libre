// 3rd party libraries - core
import React from 'react';
import {View, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import {MapView} from 'expo';

const {Marker} = MapView;
// 3rd party libraries - additional
import _ from 'lodash';

// styles and language
import {campsiteIcon} from '../styles';

// our components - core
// our components - additional

const SearchMap = ({mapLoaded, lastKnownRegion, updateRegion, sites}) => {
    const {fillScreen, spinnerContainerStyle} = styles;

    const newRegionIsAcceptable = (newRegion) => {
        const {longitude, latitude, latitudeDelta, longitudeDelta} = newRegion;

        const zoomedTooFarOut = latitudeDelta > 60 || longitudeDelta > 60;
        const isSF = (Math.abs(Math.abs(longitude) - 122.409) < 1) && (Math.abs(Math.abs(latitude) - 37.787) < 1);

        return !isSF && !zoomedTooFarOut;
    };

    const renderSites = () => {
        const renderedSites = _.map(sites, site => {
            const {title, description, coordinate, id} = site;

            return (
                <Marker
                    key={id}
                    title={title}
                    description={description}
                    coordinate={coordinate}
                >

                    <Icon type='material-community' name='tent' size={25} color={campsiteIcon}/>

                </Marker>
            );
        });

        return renderedSites;
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
                    initialRegion={lastKnownRegion}
                    onRegionChangeComplete={onRegionChange}
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