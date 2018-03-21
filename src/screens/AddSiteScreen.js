import React, {Component} from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import {connect} from 'react-redux';

import {Icon, Overlay, Text, Card} from 'react-native-elements';
import { badgeGreen, limeGreenTitle, linkColorBlue, blueGreenNav } from '../styles/index';
import {campsite} from '../locale.en';

const {site_description} = campsite;

import {navKeys} from '../constants';
import {add_site_screen} from '../locale.en';
const {title, header_title} = add_site_screen;

class AddSiteScreen extends Component {

    static renderRightNavButton = (navigate) => {
        const {topRightIconStyle} = styles;

        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity style={topRightIconStyle} onPress={() => navigate(navKeys.ADD_SITE_FORM)}>
                    <Icon type='entypo'
                          name='add-to-list'
                          size={25}
                          color={linkColorBlue}

                    />
                </TouchableOpacity>
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: title,
            headerTitle: header_title,
            headerLeft: null,
            headerRight: AddSiteScreen.renderRightNavButton(navigate),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    render() {

        return (
            <View>
                <Card>
                    <Text>
                        {site_description}
                    </Text>
                </Card>
            </View>
        );
    }
}

const styles = {
    topRightIconStyle: {
        paddingRight: 20
    }

};

export default connect(null)(AddSiteScreen);
