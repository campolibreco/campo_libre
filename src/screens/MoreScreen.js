import {AppLoading, WebBrowser} from 'expo';
import React, {Component} from 'react';
import {Platform, Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Card, ListItem, Divider} from 'react-native-elements';

import NavbarButton from '../components/common/NavbarButton';

import {logUserOutOfFacebook} from '../actions';
import {badgeGreen, limeGreenTitle, linkColorBlue} from '../styles/index';

import {more_screen} from '../locale.en';
const {fire_safety_section, wilderness_safety, camping_tips} = more_screen;

import {external_links} from '../constants';
const {co_fire_bans_url, build_a_safe_fire_url, camping_bear_safe_url, general_safety_guidelines_url, winter_camping_safely_url, car_camping_checklist_url, forest_service_contact_url} = external_links;

class MoreScreen extends Component {
    componentDidMount() {
        this.props.navigation.setParams({onLogout: this.onLogout});
    }

    onLogout = () => {
        const {navigation: {navigate}} = this.props;

        this.props.logUserOutOfFacebook({navigate});
    };

    static renderRightNavButton = ({onLogout}) => {
        if (Platform.OS === 'ios') {
            return (
                <NavbarButton
                    title={more_screen.right_nav}
                    onPress={onLogout}
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {state: {params = {}}}} = props;

        return {
            title: more_screen.title,
            headerTitle: more_screen.header_title,
            headerLeft: null,
            headerRight: MoreScreen.renderRightNavButton(params),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='ionicon' name={focused ? 'ios-more' : 'ios-more-outline'} size={25} color={tintColor}/>)
        }

    };

    renderScreen() {
        const {headingStyle, cardStyle, listItemStyle} = styles;

        const {appReady} = this.props;

        if (!appReady) {
            return <AppLoading/>
        }

        return (
            <ScrollView>
                <Text style={headingStyle}>{camping_tips.title}</Text>
                <View containerStyle={cardStyle}>
                    <ListItem
                        onPress={()=>Expo.WebBrowser.openBrowserAsync(car_camping_checklist_url)}
                        containerStyle={listItemStyle}
                        title={camping_tips.car_camping_checklist}
                        leftIcon={{name: 'car-estate', type: 'material-community'}}
                    />
                </View>

                <Text style={headingStyle}>{fire_safety_section.title}</Text>
                <View containerStyle={cardStyle}>
                    <ListItem
                        onPress={()=>Expo.WebBrowser.openBrowserAsync(co_fire_bans_url)}
                        containerStyle={listItemStyle}
                        title={fire_safety_section.co_fire_bans}
                        leftIcon={{name: 'fire-extinguisher', type: 'font-awesome'}}
                    />

                    <ListItem
                        onPress={()=>Expo.WebBrowser.openBrowserAsync(build_a_safe_fire_url)}
                        title={fire_safety_section.build_a_safe_fire}
                        leftIcon={{name: 'md-bonfire', type: 'ionicon'}}
                    />
                </View>

                <Text style={headingStyle}>{wilderness_safety.title}</Text>
                <View>
                    <ListItem
                        onPress={()=>Expo.WebBrowser.openBrowserAsync(general_safety_guidelines_url)}
                        title={wilderness_safety.general_safety_guidelines}
                        leftIcon={{name: 'first-aid', type: 'foundation'}}
                    />

                    <ListItem
                        onPress={()=>Expo.WebBrowser.openBrowserAsync(camping_bear_safe_url)}
                        title={wilderness_safety.camping_bear_safe}
                        leftIcon={{name: 'food-off', type: 'material-community'}}
                    />

                    <ListItem
                        onPress={()=>Expo.WebBrowser.openBrowserAsync(winter_camping_safely_url)}
                        title={wilderness_safety.safe_winter_camping}
                        leftIcon={{name: 'snowflake-o', type: 'font-awesome'}}
                    />

                    <ListItem
                        onPress={()=>Expo.WebBrowser.openBrowserAsync(forest_service_contact_url)}
                        title={wilderness_safety.forest_service_contact_info}
                        leftIcon={{name: 'ios-call', type: 'ionicon'}}
                    />
                </View>

            </ScrollView>
        );
    }

    render() {
        return (
            <View>
                {this.renderScreen()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headingStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 5
    },
    cardStyle: {
        marginTop: 0
    },
    listItemStyle: {
        borderWidth: 0
    }
});

const mapStateToProps = (state, ownProps) => {
    const {token, appReady} = state.auth;

    return {token, appReady};
};

export default connect(mapStateToProps, {logUserOutOfFacebook})(MoreScreen);
