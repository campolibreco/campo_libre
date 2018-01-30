import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import {MapView} from 'expo';
import {Icon} from 'react-native-elements';

import _ from 'lodash';

import {CardSection, Card} from '../components/common/index';

const SearchOptions = {
    MAP: 'map',
    LIST: 'list'
};


class SearchScreen extends Component {
    state = {
        region: {
            longitude: -105.727939,
            latitude: 39.695168,
            longitudeDelta: 1,
            latitudeDelta: 1
        },
        mapLoaded: false,
        viewStyle: SearchOptions.MAP
    };

    toggleButton = () => {
        const {viewStyle} = this.state;

        const nextButtonName = viewStyle;
        const newViewStyle = viewStyle === SearchOptions.MAP ? SearchOptions.LIST : SearchOptions.MAP;

        this.props.navigation.setParams({buttonName: nextButtonName});
        this.setState({viewStyle: newViewStyle});
    };

    componentDidMount() {
        Keyboard.dismiss();

        this.props.navigation.setParams({buttonName: SearchOptions.LIST, toggleButton: this.toggleButton});

        this.setState({
            mapLoaded: true
        });
    }

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
        const longDeltaIsAcceptable = (Math.abs(newRegion.longitudeDelta - this.state.region.longitudeDelta) < 10);
        const latDeltaIsAcceptable = (Math.abs(newRegion.latitudeDelta - this.state.region.latitudeDelta) < 10);

        return longDeltaIsAcceptable && latDeltaIsAcceptable;
    };

    onRegionChangeComplete = (newRegion) => {

        if (!this.regionDeltaIsAcceptable(newRegion)) {
            return;
        }
        this.setState({
            region: newRegion
        })
    };

    renderMap = () => {
        const {fillScreen, spinnerContainerStyle} = styles;

        if (this.state.mapLoaded) {
            return (
                <MapView
                    style={fillScreen}
                    region={this.state.region}
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

        const {viewStyle} = this.state;
        if (viewStyle === SearchOptions.MAP) {
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

export default SearchScreen;