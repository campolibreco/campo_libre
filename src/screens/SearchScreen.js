import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button, Card} from 'react-native-elements';
import { AppLoading } from 'expo';
import MapView from 'react-native-maps';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import _ from 'lodash';

import {NavbarButton} from '../components/common';
import SearchList from '../components/SearchList';
import SearchMap from '../components/SearchMap';

import {
    initializeMap,
    updateViewStyle,
    mapHasLoaded,
    updateRegion,
    getSiteDetail,
    attemptToAddFavorite,
    attemptToRemoveFavorite
} from "../actions";

import {map, navKeys} from '../constants';
import {search_screen} from '../locale.en';
import {bloodOrange, sunsetOrange, badgeGreen, limeGreenTitle, linkColorBlue, blueGreenNav} from "../styles";

const {title, header_title, filter, filtered} = search_screen;


class SearchScreen extends Component {

    componentWillMount() {
        const {lastKnownRegion} = this.props;

        this.props.initializeMap({region: lastKnownRegion});
    }

    componentDidMount() {
        const {lastKnownRegion, viewStyle, navigation: {setParams}} = this.props;

        const newViewStyle = this.getNextViewStyle();

        setParams({buttonName: newViewStyle, toggleButton: this.toggleButton});

        this.props.mapHasLoaded();
    }

    componentWillReceiveProps(nextProps) {
        const {filterCriteriaKeys} = nextProps;
        const {navigation: {state: {params = {}}}} = this.props;

        const sitesAreFiltered = filterCriteriaKeys.accessibility.length > 0 || filterCriteriaKeys.facilities.length > 0 || filterCriteriaKeys.features.length > 0 || filterCriteriaKeys.price.length > 0 || filterCriteriaKeys.forest.length > 0;

        if (sitesAreFiltered !== params.sitesAreFiltered) {
            this.props.navigation.setParams({sitesAreFiltered});
        }
    }

    getNextViewStyle = () => {
        const {viewStyle} = this.props;

        const newViewStyle = viewStyle === map.SearchOptions.MAP ? map.SearchOptions.LIST : map.SearchOptions.MAP;

        return newViewStyle;
    };

    toggleButton = () => {
        const {viewStyle} = this.props;

        const nextButtonName = viewStyle;
        const newViewStyle = this.getNextViewStyle();

        this.props.navigation.setParams({buttonName: nextButtonName});
        this.props.updateViewStyle(newViewStyle);
    };

    static renderLeftNavButton = ({buttonName, toggleButton}) => {
        let preparedName = _.capitalize(buttonName);

        if (Platform.OS === 'ios') {
            return (
                <NavbarButton
                    title={preparedName}
                    onPress={toggleButton}
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static renderRightNavButton = ({navigate, params}) => {
        const {sitesAreFiltered} = params;

        if (Platform.OS === 'ios') {
            return (
                <NavbarButton
                    title={sitesAreFiltered ? filtered : filter}
                    onPress={() => navigate(navKeys.FILTER)}
                    textStyleOverride={{color: sitesAreFiltered ? sunsetOrange: linkColorBlue}}
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate, state: {params = {}}}} = props;

        return {
            title: title,
            headerTitle: header_title,
            headerLeft: SearchScreen.renderLeftNavButton(params),
            headerRight: SearchScreen.renderRightNavButton({navigate, params}),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='ionicon' name={focused ? 'ios-search' : 'ios-search-outline'} size={25} color={tintColor}/>)
        }
    };

    renderSearchScreen = () => {
        const {viewStyle, lastKnownRegion, mapLoaded, displaySites, selectedSite, currentUser, navigation: {navigate}} = this.props;

        if (viewStyle === map.SearchOptions.MAP) {
            return (
                <SearchMap
                    lastKnownRegion={lastKnownRegion}
                    mapLoaded={mapLoaded}
                    updateRegion={this.props.updateRegion}
                    sites={displaySites}
                    navigate={navigate}
                    getSiteDetail={this.props.getSiteDetail}
                    selectedSite={selectedSite}
                />
            );
        } else if (viewStyle === map.SearchOptions.LIST) {
            return (
                <SearchList
                    sites={displaySites}
                    getSiteDetail={this.props.getSiteDetail}
                    navigate={navigate}
                />
            );
        } else {
            return (
                <AppLoading/>
            );
        }

    };

    render() {
        const {fillScreen} = styles;
        const {appReady} = this.props;

        if (!appReady) {
            return <AppLoading/>

        }

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
    const {lastKnownRegion, mapLoaded, viewStyle, displaySites, selectedSite, filterCriteriaKeys} = state.map;
    const {token, appReady, currentUser} = state.auth;

    return {lastKnownRegion, mapLoaded, viewStyle, token, appReady, currentUser, displaySites, selectedSite, filterCriteriaKeys};
}

export default connect(mapStateToProps, {
    initializeMap,
    updateViewStyle,
    mapHasLoaded,
    updateRegion,
    getSiteDetail,
    attemptToAddFavorite,
    attemptToRemoveFavorite
})(SearchScreen);
