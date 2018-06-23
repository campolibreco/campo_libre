import React, {Component} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {MapView} from 'expo';

const {Marker} = MapView;

import _ from 'lodash';

import {campsite} from '../locale.en';
import {sunsetOrange} from "../styles";
import {getSiteToShow} from '../services/SiteInfoService';

const {click_for_maps} = campsite;

class SiteMapViewScreen extends Component {

    componentWillMount() {
        const {navigation: {setParams}} = this.props;
        const siteToShow = getSiteToShow(this.props);

        setParams({siteTitle: siteToShow.title});
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
        const siteToShow = getSiteToShow(this.props);

        const {coordinate} = siteToShow;
        const zoomLevel = 15;
        const mapLink = `http://maps.google.com/maps?q=${coordinate.latitude},${coordinate.longitude}&z=${zoomLevel}`;

        Linking.openURL(mapLink).catch(err => console.error('An error occurred', err));
    };


    renderSiteDetailMapViewScreen = () => {
        const {fillScreen} = styles;
        const siteToShow = getSiteToShow(this.props);

        const {coordinate} = siteToShow;

        if (siteToShow) {
            return (

                <MapView
                    style={fillScreen}
                    onMapReady={() => this.marker.showCallout()}
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
                        title={click_for_maps}
                        onCalloutPress={this.onClickMarker}
                        onPress={this.onClickMarker}
                    >

                        <Icon type='material-community' name='tent' size={40} color={sunsetOrange}/>

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
    const {selectedSite, selectedPendingSite} = state.map;

    return {selectedSite, selectedPendingSite};
}

export default connect(mapStateToProps, {})(SiteMapViewScreen);
