import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import {MapView} from 'expo';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import {initializeMap, updateViewStyle, mapLoaded, updateRegion} from "../actions";

import _ from 'lodash';

import {CardSection, Card} from '../components/common/index';

import {map} from '../constants';


class SearchScreen extends Component {
    componentWillMount() {
        this.props.initializeMap();
    }

    componentDidMount() {
        Keyboard.dismiss();

        this.props.navigation.setParams({buttonName: map.SearchOptions.LIST, toggleButton: this.toggleButton});

        this.props.mapLoaded();
    }

    toggleButton = () => {
        const {viewStyle} = this.props;

        const nextButtonName = viewStyle;
        const newViewStyle = viewStyle === map.SearchOptions.MAP ? map.SearchOptions.LIST : map.SearchOptions.MAP;

        this.props.navigation.setParams({buttonName: nextButtonName});
        this.props.updateViewStyle(newViewStyle);
    };

    static renderLeftNavButton = ({buttonName, toggleButton}) => {
        let preparedName = _.capitalize(buttonName);

        if (Platform.OS === 'ios') {
            return (
                <Button
                    title={preparedName}
                    onPress={toggleButton}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static renderRightNavButton = (navigate) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title="Filter"
                    onPress={() => navigate('filter')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate, state: {params = {}}}} = props;

        return {
            title: 'Search',
            headerTitle: 'Find a Site',
            headerLeft: SearchScreen.renderLeftNavButton(params),
            headerRight: SearchScreen.renderRightNavButton(navigate),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='ionicon' name={focused ? 'ios-search' : 'ios-search-outline'} size={25} color={tintColor}/>)
        }

    };

    regionDeltaIsAcceptable = (newRegion) => {
        const longDeltaIsAcceptable = (Math.abs(newRegion.longitudeDelta - this.props.region.longitudeDelta) < 10);
        const latDeltaIsAcceptable = (Math.abs(newRegion.latitudeDelta - this.props.region.latitudeDelta) < 10);

        return longDeltaIsAcceptable && latDeltaIsAcceptable;
    };

    onRegionChangeComplete = (newRegion) => {

        if (!this.regionDeltaIsAcceptable(newRegion)) {
            return;
        }
        this.props.updateRegion(newRegion);
    };

    renderMap = () => {
        const {fillScreen, spinnerContainerStyle} = styles;

        if (this.props.mapLoaded) {
            return (
                <MapView
                    style={fillScreen}
                    region={this.props.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
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

    renderList = () => {
        return (
            <Card>
                <CardSection>
                    <Text>
                        List Results of Sites
                    </Text>
                </CardSection>
            </Card>
        );
    };

    renderSearchScreen = () => {

        const {viewStyle} = this.props;
        if (viewStyle === map.SearchOptions.MAP) {
            return this.renderMap();
        } else {
            return this.renderList();
        }

    };

    render() {
        const {fillScreen} = styles;

        return (
            <View style={fillScreen}>
                {this.renderSearchScreen()}
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

function mapStateToProps(state) {
    const {region, mapLoaded, viewStyle} = state.map;


    return {region, mapLoaded, viewStyle};
}

export default connect(mapStateToProps, {initializeMap, updateViewStyle, mapLoaded, updateRegion})(SearchScreen);