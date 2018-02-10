import {AppLoading} from 'expo';
import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Card} from 'react-native-elements';

import {logUserOutOfFacebook} from '../actions';

import {more_screen} from '../locale.en';
import {navKeys} from '../constants';

class MoreScreen extends Component {
    componentDidMount() {
        const {token, navigation: {navigate, state: {key}}} = this.props;

        if (!token && key !== navKeys.LOGIN) {
            navigate(navKeys.LOGIN);
        }

        this.props.navigation.setParams({onLogout: this.onLogout});
    }

    componentWillReceiveProps(nextProps) {
        const {token, navigation: {navigate, state: {key}}} = nextProps;

        if (!token) {
            navigate(navKeys.LOGIN);
        }
    }

    onLogout = () => {
        this.props.logUserOutOfFacebook();
    };

    static renderRightNavButton = ({onLogout}) => {
        if (Platform.OS === 'ios') {
            return (
                <Button
                    title={more_screen.right_nav}
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

    renderScreen() {
        const {appReady} = this.props;

        if (!appReady) {
            return <AppLoading/>
        }

        return (
            <Card>
                <Text>
                    More screen
                </Text>
            </Card>
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

const mapStateToProps = (state, ownProps) => {
    const {token, appReady} = state.auth;

    return {token, appReady};
};

export default connect(mapStateToProps, {logUserOutOfFacebook})(MoreScreen);