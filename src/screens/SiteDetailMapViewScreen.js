import React, {Component} from 'react';
import {View, StyleSheet, Linking, Platform} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

const {Marker} = MapView;

import _ from 'lodash';

import { campsite, common} from '../locale.en';
import {campsiteIcon, linkColorBlue, bloodOrange} from "../styles";

const {click_for_maps} = campsite;

class SiteMapViewScreen extends Component {

    componentWillMount() {
        const {selectedSite, navigation: {setParams}} = this.props;

        setParams({siteTitle: selectedSite.title});
    }

    setMarkerRef = (ref) => {
        this.marker = ref
    };

    static navigationOptions = (props) => {
        const {navigation: {state: {params = {}}}} = props;
        const {siteTitle} = params;

        return {
            headerTitle: _.isUndefined(siteTitle) ? '' : siteTitle
        }

    };

    onClickMarker = () => {
        const {selectedSite} = this.props;
        const {coordinate} = selectedSite;
        const zoomLevel = 15;
        const mapLink = `http://maps.google.com/maps?q=${coordinate.latitude},${coordinate.longitude}&z=${zoomLevel}`;

        Linking.openURL(mapLink).catch(err => console.error('An error occurred', err));
    };


    renderSiteDetailMapViewScreen = () => {
        const {fillScreen} = styles;
        const {selectedSite} = this.props;
        const {coordinate} = selectedSite;

        if (selectedSite) {
            return (

                <MapView
                    style={fillScreen}
                    onRegionChangeComplete={() => this.marker.showCallout()}
                    initialRegion={{
                        longitude: coordinate.longitude,
                        latitude: coordinate.latitude,
                        longitudeDelta: 1,
                        latitudeDelta: 1
                    }}
                >
                    <Marker
                        ref={this.setMarkerRef}
                        coordinate={coordinate}
                        showCallout={true}
                        title={click_for_maps}
                        onCalloutPress={this.onClickMarker}
                        onPress={this.onClickMarker}
                    >

                        <Icon type='material-community' name='tent' size={25} color={sunsetOrange}/>

                    </Marker>
                </MapView>
            );
        }

    };

    render() {
        const {fillScreen} = styles;

        return (
            <View style={fillScreen}>
                {this.renderSiteDetailMapViewScreen()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fillScreen: {
        flex: 1
    }
});

function mapStateToProps(state) {
    const {selectedSite} = state.map;

    return {selectedSite};
}

export default connect(mapStateToProps, {})(SiteMapViewScreen);
