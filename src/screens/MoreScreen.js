import React, {Component} from 'react';
import {Platform, Text} from 'react-native';
import {Icon, Button, Card} from 'react-native-elements';

import {more_screen} from '../locale.en';
const {right_nav} = more_screen;

class MoreScreen extends Component {
    static renderRightNavButton = (navigate) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title={right_nav}
                    onPress={() => navigate('login')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: 'More',
            headerTitle: 'More Options',
            headerLeft: null,
            headerRight: MoreScreen.renderRightNavButton(navigate),
            tabBarIcon: ({focused, tintColor }) => (<Icon type='ionicon' name={focused ? 'ios-more' : 'ios-more-outline'} size={25} color={tintColor} />)
        }

    };

    render(){
        return(
            <Card>
                <Text>
                    More screen
                </Text>
            </Card>
        );
    }
}

export default MoreScreen;