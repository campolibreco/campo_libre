import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {MapView, AppLoading} from 'expo';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import _ from 'lodash';

import SearchList from '../components/SearchList';
import SearchMap from '../components/SearchMap';

import {initializeMap, updateViewStyle, mapHasLoaded, updateRegion} from "../actions";

import {map, navKeys} from '../constants';


class SearchScreen extends Component {
    componentWillMount() {
        const {lastKnownRegion} = this.props;

        this.props.initializeMap({region: lastKnownRegion});
    }

    componentDidMount() {
        const {lastKnownRegion, navigation: {setParams}} = this.props;

        setParams({buttonName: map.SearchOptions.LIST, toggleButton: this.toggleButton});

        this.props.mapHasLoaded();
    }

    componentWillReceiveProps(nextProps){
        const {sitesShouldUpdate, lastKnownRegion} = nextProps;

        if(sitesShouldUpdate && sitesShouldUpdate !== this.props.sitesShouldUpdate){
            this.props.initializeMap({region: lastKnownRegion});
        }

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
                    onPress={() => navigate(navKeys.FILTER)}
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

    renderSearchScreen = () => {
        const {viewStyle, lastKnownRegion, mapLoaded, displaySites} = this.props;

        if (viewStyle === map.SearchOptions.MAP) {
            return (
                <SearchMap
                    lastKnownRegion={lastKnownRegion}
                    mapLoaded={mapLoaded}
                    updateRegion={this.props.updateRegion}
                    sites={displaySites}
                />
            );
        } else {
            return (
                <SearchList
                    sites={displaySites}
                />
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
    const {lastKnownRegion, mapLoaded, viewStyle, displaySites} = state.map;
    const {token, appReady} = state.auth;
    const {sitesShouldUpdate} = state.addSite;


    return {lastKnownRegion, mapLoaded, viewStyle, token, appReady, displaySites, sitesShouldUpdate};
}

export default connect(mapStateToProps, {initializeMap, updateViewStyle, mapHasLoaded, updateRegion})(SearchScreen);