import React, {Component} from 'react';
import {Text, ScrollView, View, StyleSheet, Platform, Switch} from 'react-native';
import {connect} from "react-redux";
import Accordion from 'react-native-collapsible/Accordion';
import {CheckBox, Button, Icon} from 'react-native-elements';

import _ from 'lodash';

import NavbarButton from '../components/common/NavbarButton';

import {checkboxWasClicked, resetAllFilters, filterToggleLogicUpdated} from "../actions";

import {map, navKeys} from '../constants';
import {campsiteIcon, grey} from "../styles";
import {campsite, filter_screen, forest_names} from '../locale.en';
const {results} = filter_screen;

const {campsite_form: {accessibility, facilities, price, features, accessibility_options, facilities_options, price_options, features_options, reset, filter, forest}} = campsite;


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

const FOREST = [
    {
        title: forest,
        content: forest_names
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
                <NavbarButton
                    title={_.isUndefined(siteCount) ? '' : `${siteCount} ${results}`}
                    onPress={() => navigate(navKeys.SEARCH)}
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static renderRightNavButton = (navigate, {onClickReset}) => {
        if (Platform.OS === 'ios') {
            return (
                <NavbarButton
                    title={reset}
                    onPress={onClickReset}
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
                <View style={headerTextStyle}>
                    <Text>
                        {section.title}
                    </Text>
                </View>
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
        const {checkBoxRowStyle} = styles;
        let clonedCheckboxObject = _.cloneDeep(checkboxObject);
        delete clonedCheckboxObject.blank;

        return _.map(clonedCheckboxObject, (value, key) => {
            return (
                <CheckBox
                    containerStyle={checkBoxRowStyle}
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
                    <Text>{filter.exactly_these}</Text>
                    <Switch
                        onValueChange={() => this.onFilterScrutinyToggleChange({filterToggleKey: lowercaseTitle})}
                        value={filterResultsScrutinyLoose[lowercaseTitle]}
                    />
                    <Text>{filter.any_of_these}</Text>
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
        const {mainContainerStyle, accordionFilterStyle, topSpaceStyle, bottomSpaceStyle} = styles;
        const collapsedState = filterCriteriaKeys.accessibility.length > 0 || filterCriteriaKeys.facilities.length > 0 || filterCriteriaKeys.features.length > 0 || filterCriteriaKeys.price.length > 0 || filterCriteriaKeys.forest.length > 0 ? 0 : -1;

        return (
            <ScrollView style={mainContainerStyle}>
                <View style={topSpaceStyle}>

                </View>

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

                <Accordion
                    underlayColor={'#00000000'}
                    initiallyActiveSection={collapsedState}
                    style={accordionFilterStyle}
                    sections={FOREST}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                />

                <View style={bottomSpaceStyle}>

                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    topSpaceStyle: {
        marginBottom: 30
    },
    bottomSpaceStyle: {
        marginTop: 50
    },
    mainContainerStyle: {
    },
    accordionFilterStyle: {},
    headerStyle: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingLeft: 50,
        paddingRight: 30,
        backgroundColor: 'white'
    },
    toggleContainerStyle: {
        marginTop: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    headerTextStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentStyle: {},
    contentTextStyle: {},
    checkBoxRowStyle: {
        margin: 0
    }
});

function mapStateToProps(state) {
    const {displaySites, filterCriteriaKeys, filterResultsScrutinyLoose} = state.map;


    return {displaySites, filterCriteriaKeys, filterResultsScrutinyLoose};
}

export default connect(mapStateToProps, {checkboxWasClicked, resetAllFilters, filterToggleLogicUpdated})(FilterScreen);
