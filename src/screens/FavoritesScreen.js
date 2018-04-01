import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Icon, List} from 'react-native-elements';

import _ from 'lodash';

import CampsiteListItem from '../components/CampsiteListItem';

import {getSiteDetail} from '../actions';

import {tokens} from '../constants';

class FavoritesScreen extends Component {
    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: 'Favorites',
            headerTitle: 'Your Favorite Campsites',
            headerLeft: null,
            tabBarIcon: ({focused, tintColor}) => (
                <Icon type='ionicon' name={focused ? 'ios-heart' : 'ios-heart-outline'} size={25} color={tintColor}/>)
        }

    };

    renderFavorites = ({sites, getSiteDetail, navigate}) => {
        return _.map(sites, (site, index) => {
            return (
                <CampsiteListItem
                    key={index}
                    site={site}
                    getSiteDetail={getSiteDetail}
                    navigate={navigate}
                />
            );
        });
    };

    renderFavoritesScreen = () => {
        const {currentUser} = this.props;

        if (!currentUser || currentUser.name === tokens.GUEST) {
            return (<Text> You must log in to have Favorites!</Text>);
        }
        else if (currentUser && currentUser.favorites && currentUser.favorites.length > 0) {
            const {navigation: {navigate}} = this.props;

            return (
                <ScrollView>
                    <List>
                        {this.renderFavorites({
                            sites: currentUser.favorites,
                            getSiteDetail: this.props.getSiteDetail,
                            navigate
                        })}
                    </List>
                </ScrollView>
            );
        } else {
            return (<Text> You have no favorites... add some!</Text>);
        }
    };

    render() {
        return (
            <View>
                {this.renderFavoritesScreen()}
            </View>
        );
    }
}

function mapStateToProps(state) {
    const {currentUser} = state.auth;

    return {currentUser};
}

export default connect(mapStateToProps, {getSiteDetail})(FavoritesScreen);
