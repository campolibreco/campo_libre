import {AppLoading} from 'expo';
import React, {Component} from 'react';
import {Platform, Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Card, ListItem, Divider} from 'react-native-elements';

import {logUserOutOfFacebook} from '../actions';
import {badgeGreen, limeGreenTitle, linkColorBlue} from '../styles/index';

import {more_screen} from '../locale.en';
import {navKeys} from '../constants';

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
                <Button
                    title={more_screen.right_nav}
                    onPress={onLogout}
                    backgroundColor="rgba(0,0,0,0)"
                    color={linkColorBlue}
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
        const {headingStyle, cardStyle, listItemStyle} = styles;

        const {appReady} = this.props;

        if (!appReady) {
            return <AppLoading/>
        }

        return (
            <ScrollView>
                <Text style={headingStyle}>First Heading</Text>
                <Card containerStyle={cardStyle}>
                    <ListItem
                        containerStyle={listItemStyle}
                        title={'First useful Link'}
                        leftIcon={{name: 'md-bonfire', type: 'ionicon'}}
                        bottomDivider={false}
                        topDivider={false}
                    />

                    <ListItem
                        title={'Another useful Link'}
                        leftIcon={{name: 'md-bonfire', type: 'ionicon'}}
                        bottomDivider={false}
                        topDivider={false}
                    />
                </Card>

                <Card>
                    <ListItem
                        title={'First useful Link'}
                        leftIcon={{name: 'md-bonfire', type: 'ionicon'}}
                    />

                    <ListItem
                        title={'Another useful Link'}
                        leftIcon={{name: 'md-bonfire', type: 'ionicon'}}
                    />
                </Card>

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
