import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet, Platform, Switch} from 'react-native';
import {connect} from "react-redux";

import _ from 'lodash';

import {CheckBox, Button, Icon} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import {checkboxWasClicked, resetAllFilters, filterToggleLogicUpdated} from "../actions";

import {map, navKeys} from '../constants';
import {campsite, more_screen, reducerAlerts} from '../locale.en';
import {campsiteIcon, grey} from "../styles";

const {campsite_form: {accessibility, facilities, price, features, accessibility_options, facilities_options, price_options, features_options, reset}} = campsite;


const ACCESSIBILITY = [
    {
        title: accessibility,
        content: accessibility_options
    }
];

const FACILITIES = [
    {
        title: facilities,
        content: facilities_options
    }
];

const FEATURES = [
    {
        title: features,
        content: features_options
    }
];

const PRICE = [
    {
        title: price,
        content: price_options
    }
];

class FilterScreen extends Component {

    componentWillMount() {
        const {displaySites} = this.props;

        this.props.navigation.setParams({siteCount: displaySites.length, onClickReset: this.onClickReset});
    }

    componentWillReceiveProps(nextProps) {
        const nextSetOfSites = nextProps.displaySites;
        const currentSites = this.props.displaySites;


        if (nextSetOfSites.length !== currentSites.length) {
            this.props.navigation.setParams({siteCount: nextSetOfSites.length});
        }
    }

    onClickReset = () => {
        this.props.resetAllFilters();
    };

    static renderHeaderTitleButton = (navigate, {siteCount}) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title={_.isUndefined(siteCount) ? '' : `${siteCount} Results`}
                    onPress={() => navigate(navKeys.SEARCH)}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static renderRightNavButton = (navigate, {onClickReset}) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title={reset}
                    onPress={onClickReset}
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
            headerTitle: FilterScreen.renderHeaderTitleButton(navigate, params),
            headerRight: FilterScreen.renderRightNavButton(navigate, params)
        }

    };

    renderHeader = (section, index, isActive) => {
        const {headerStyle, headerTextStyle} = styles;

        return (
            <View style={headerStyle}>
                <Text style={headerTextStyle}>
                    {section.title}

                </Text>
                <Icon type='entypo' name={isActive ? 'chevron-down' : 'chevron-up'} size={25} color={campsiteIcon}/>
            </View>
        );
    };

    onClickCheckbox = (key) => {
        this.props.checkboxWasClicked({filterKey: key})
    };

    renderCheckedState = (key) => {
        const {filterCriteriaKeys} = this.props;
        const flatFilterCriteriaList = _(filterCriteriaKeys)
            .map(categoryKeys => {
                return _.map(categoryKeys, innerKey => innerKey)
            })
            .flatten()
            .valueOf();

        return _.includes(flatFilterCriteriaList, key);
    };

    renderCheckboxes = (checkboxObject) => {
        return _.map(checkboxObject, (value, key) => {
            return (
                <CheckBox
                    key={key}
                    title={value}
                    checked={this.renderCheckedState(key)}
                    onPress={() => this.onClickCheckbox(key)}
                />
            );
        })
    };

    onFilterScrutinyToggleChange = ({filterToggleKey}) => {
        this.props.filterToggleLogicUpdated({filterToggleKey});
    };

    renderToggleSwitch = ({title}) => {
        const {toggleContainerStyle} = styles;
        const {filterResultsScrutinyLoose} = this.props;

        if (title === features || title === facilities) {
            const lowercaseTitle = _.toLower(title);

            return (
                <View style={toggleContainerStyle}>
                    <Text>Exactly These</Text>
                    <Switch
                        onValueChange={() => this.onFilterScrutinyToggleChange({filterToggleKey: lowercaseTitle})}
                        value={filterResultsScrutinyLoose[lowercaseTitle]}
                    />
                    <Text>Some of These</Text>
                </View>
            )
        }
    };

    renderContent = (section) => {
        const {contentStyle} = styles;

        return (
            <View style={contentStyle}>
                {this.renderToggleSwitch(section)}
                {this.renderCheckboxes(section.content)}
            </View>
        );
    };

    render() {
        const {filterCriteriaKeys} = this.props;
        const {mainContainerStyle, accordionFilterStyle} = styles;
        const collapsedState = filterCriteriaKeys.accessibility.length > 0 || filterCriteriaKeys.facilities.length > 0 || filterCriteriaKeys.features.length > 0 || filterCriteriaKeys.price.length > 0 ? 0 : -1;

        return (
            <ScrollView style={mainContainerStyle}>
                <Accordion
                    underlayColor={'#00000000'}
                    initiallyActiveSection={collapsedState}
                    style={accordionFilterStyle}
                    sections={ACCESSIBILITY}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                />

                <Accordion
                    underlayColor={'#00000000'}
                    initiallyActiveSection={collapsedState}
                    style={accordionFilterStyle}
                    sections={PRICE}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                />

                <Accordion
                    underlayColor={'#00000000'}
                    initiallyActiveSection={collapsedState}
                    style={accordionFilterStyle}
                    sections={FACILITIES}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                />

                <Accordion
                    underlayColor={'#00000000'}
                    initiallyActiveSection={collapsedState}
                    style={accordionFilterStyle}
                    sections={FEATURES}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        margin: 30
    },
    accordionFilterStyle: {},
    headerStyle: {
        height: 30,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 30
    },
    toggleContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    headerTextStyle: {},
    contentStyle: {},
    contentTextStyle: {}
});

function mapStateToProps(state) {
    const {displaySites, filterCriteriaKeys, filterResultsScrutinyLoose} = state.map;


    return {displaySites, filterCriteriaKeys, filterResultsScrutinyLoose};
}

export default connect(mapStateToProps, {checkboxWasClicked, resetAllFilters, filterToggleLogicUpdated})(FilterScreen);