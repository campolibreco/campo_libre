import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Platform, Keyboard} from 'react-native';
import {Button, Card} from 'react-native-elements';
import {MapView} from 'expo';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import _ from 'lodash';


import {badgeGreen, limeGreenTitle, linkColorBlue, blueGreenNav} from '../styles/index';

import {navKeys} from '../constants';
import {site_detail_screen} from '../locale.en';

const {header_title} = site_detail_screen;

class SiteDetailScreen extends Component {
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {


    }


    static navigationOptions = (props) => {
        const {navigation: {navigate, state: {params = {}}}} = props;

        return {
            headerTitle: header_title,
            headerBackTitle: 'Back',
            headerBackTitleStyle: {
                color: linkColorBlue
            },
            headerTintColor: linkColorBlue
        }
    };

    renderSiteDetailScreen = () => {
        const {selectedSite} = this.props;
        const {accessibility, coordinate, description, directions, facilities, features, nearestTown, price, siteImageData, title} = selectedSite;

        if (selectedSite) {
            return (
                <Card
                    title={title}
                    image={siteImageData ? {uri: `data:image/png;base64,${siteImageData}`} : require('../../assets/starTent.jpg')}
                >
                    <Text style={{marginBottom: 10}}>
                        {description}
                    </Text>
                </Card>
            );
        }

    };

    render() {
        const {fillScreen} = styles;

        return (
            <View style={fillScreen}>
                {this.renderSiteDetailScreen()}
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

export default connect(mapStateToProps, {})(SiteDetailScreen);
