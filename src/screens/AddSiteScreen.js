import React, {Component} from 'react';
import {TouchableOpacity, View, Platform} from 'react-native';
import {connect} from 'react-redux';

import {Icon, Overlay, Text, Card} from 'react-native-elements';

import {} from '../actions';

import {campsite} from '../locale.en';

const {site_description} = campsite;

import {navKeys} from '../constants';


class AddSiteScreen extends Component {

    static renderRightNavButton = (navigate) => {
        const {topRightIconStyle} = styles;

        if (Platform.OS === 'ios') {
            return (
                <TouchableOpacity style={topRightIconStyle} onPress={() => navigate(navKeys.ADD_SITE_FORM)}>
                    <Icon type='entypo'
                          name='add-to-list'
                          size={25}
                          color="rgba(0,122,255,1)"

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
            title: 'Add a Site',
            headerTitle: 'Your Submitted Sites',
            headerLeft: null,
            headerRight: AddSiteScreen.renderRightNavButton(navigate),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor}/>)
        }
    };

    render() {
        const {} = styles;

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

function mapStateToProps(state) {


    return {};
}

export default connect(mapStateToProps, {})(AddSiteScreen);
