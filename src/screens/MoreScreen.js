import React, {Component} from 'react';
import {Platform, Text} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Card} from 'react-native-elements';

import {logUserOutOfFacebook} from '../actions';

import {more_screen} from '../locale.en';

const {right_nav} = more_screen;

class MoreScreen extends Component {
    componentDidMount() {
        const {token, navigation: {navigate}} = this.props;

        if (!token) {
            navigate('login');
        }

        this.props.navigation.setParams({onLogout: this.onLogout});
    }

    componentWillReceiveProps(nextProps) {
        const {token, navigation: {navigate}} = nextProps;

        if (!token) {
            navigate('login');
        }
    }

    onLogout = () => {
        this.props.logUserOutOfFacebook();
    };

    static renderRightNavButton = ({onLogout}) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title={right_nav}
                    onPress={onLogout}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            );
        } else if (Platform.OS === 'android') {
            // android-specific code for navigation here
        }
    };

    static navigationOptions = (props) => {
        const {navigation: {state: {params = {}}}} = props;

        return {
            title: 'More',
            headerTitle: 'More Options',
            headerLeft: null,
            headerRight: MoreScreen.renderRightNavButton(params),
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='ionicon' name={focused ? 'ios-more' : 'ios-more-outline'} size={25} color={tintColor}/>)
        }

    };

    render() {
        return (
            <Card>
                <Text>
                    More screen
                </Text>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {token} = state.auth;

    return {token};
};

export default connect(mapStateToProps, {logUserOutOfFacebook})(MoreScreen);