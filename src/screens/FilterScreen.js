import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet} from 'react-native';
import {connect} from "react-redux";

import Accordion from 'react-native-collapsible/Accordion';

import MapScreen from "../components/SearchMap";
import {initializeMap, mapHasLoaded, updateRegion, updateViewStyle} from "../actions";


const SECTIONS = [
    {
        title: 'Accessibility',
        content: 'Lorem ipsum...'
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...'
    }
];

class FilterScreen extends Component {

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            headerTitle: 'Filter Your Search'
        }

    };

    renderHeader(section) {
        const {headerStyle, headerTextStyle} = styles;

        return (
            <View style={headerStyle}>
                <Text style={headerTextStyle}>{section.title}</Text>
            </View>
        );
    }

    renderContent(section) {
        const {contentStyle, contentTextStyle} = styles;

        return (
            <View style={contentStyle}>
                <Text>{section.content}</Text>
            </View>
        );
    }

    render(){
        return(
            <ScrollView>
                <Accordion
                    sections={SECTIONS}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {},
    headerTextStyle: {},
    contentStyle:{},
    contentTextStyle:{}
});

function mapStateToProps(state) {
    const {lastKnownRegion, mapLoaded, viewStyle, sites} = state.map;
    const {token, appReady} = state.auth;
    const {sitesShouldUpdate} = state.addSite;


    return {lastKnownRegion, mapLoaded, viewStyle, token, appReady, sites, sitesShouldUpdate};
}

export default connect(mapStateToProps, {})(FilterScreen);