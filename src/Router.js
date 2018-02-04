// 3rd party libraries - core
import React from 'react';
import {View, Text} from 'react-native';
import {Stack, Scene, Router, Actions, Tabs} from 'react-native-router-flux';
// 3rd party libraries - additional
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

// actions

// styles and language
import {backgroundLight, highlightGreen, highlightBlue, iOSBlue} from './styles';
import {campsite} from './locale.en';

// our components - core
// import Login from './screens/LoginScreen';
import Dashboard from './components/Dashboard';
import More from './screens/MoreScreen';
import Search from './components/Search';
import Favorites from './screens/FavoritesScreen';
import List from './components/SearchList';
import Map from './components/SearchMap';
import Filter from './screens/FilterScreen';
import Campsite from './screens/AddSiteScreen';
// our components - additional
import {CardSection, Card, Input, Button} from './components/common';

const TabIcon = ({focused, title}) => {
    switch (title) {
        case 'Search':
            return (
                <Icon name={focused ? 'ios-search' : 'ios-search-outline'} size={30}
                      color={focused ? highlightGreen : highlightBlue}/>
            );
        case 'Favorites':
            return (
                <Icon name={focused ? 'ios-heart' : 'ios-heart-outline'} size={30}
                      color={focused ? highlightGreen : highlightBlue}/>
            );

        case 'Add a Site':
            return (
                <Icon2 name={focused ? 'tent' : 'tent'} size={30}
                       color={focused ? highlightGreen : highlightBlue}/>
            );
        case 'More':
            return (
                <Icon name={focused ? 'ios-more' : 'ios-more-outline'} size={30}
                      color={focused ? highlightGreen : highlightBlue}/>
            );
    }
};

const rightFilter = () => {
    const {rightFilterStyle} = styles;

    return (
        <View>
            <Text style={rightFilterStyle}>Filter</Text>
        </View>
    );
};


const leftList = () => {
    const {leftListStyle} = styles;

    return (
        <View>
            <Text style={leftListStyle}>List</Text>
        </View>
    );
};

const leftMap = () => {
    const {leftListStyle} = styles;

    return (
        <View>
            <Text style={leftListStyle}>Map</Text>
        </View>
    );
};

const navigateToMap = () => {
    console.log("clicked on Map");
    Actions.hidden({type: 'reset'});
    Actions.tabbar();
    Actions.map();
};

const navigateToList = () => {
    console.log("clicked on List");
    Actions.hidden({type: 'reset'});
    Actions.tabbar();
    Actions.list();
};

const navigateToFilter = () => {
    console.log("clicked on Filter");
    Actions.filter();
};

const logOutUser = () => {
    firebase.auth().signOut()
        .then((user) => {
            Actions.login({type: 'reset'});
        })
};

// <Scene key="dashboard" component={Dashboard} title="Your Dashboard"/>

const RouterComponent = () => {
    const {navigationStyle} = styles;

    return (
        <Router>
            <Stack key="root">

                <Scene
                    key="login"
                    component={Login}
                    title="Please Log In"
                    navigationBarStyle={navigationStyle}
                    initial
                />

                <Scene key="hidden" hideNavBar>
                    <Tabs
                        key="tabbar"
                        tabs={true}
                        tabBarStyle={navigationStyle}
                    >

                        <Stack
                            key="searchTab"
                            title="Search"
                            tabBarLabel="Search"
                            icon={TabIcon}
                            navigationBarStyle={navigationStyle}
                        >
                            <Scene
                                key="map"
                                component={Map}
                                title="Search For a Campsite"
                                rightTitle="Filter"
                                leftTitle="List"
                                onLeft={navigateToList}
                                onRight={navigateToFilter}
                            />

                            <Scene
                                key="list"
                                component={List}
                                title="Search For a Campsite"
                                rightTitle="Filter"
                                leftTitle="Map"
                                onLeft={navigateToMap}
                                onRight={navigateToFilter}
                            />

                        </Stack>

                        <Stack
                            key="favoritesTab"
                            title="Favorites"
                            icon={TabIcon}
                            navigationBarStyle={navigationStyle}
                        >
                            <Scene key="favorites" component={Favorites} title="Your Favorites"/>
                        </Stack>

                        <Stack
                            key="addSiteTab"
                            title="Add a Site"
                            icon={TabIcon}
                            navigationBarStyle={navigationStyle}
                        >
                            <Scene key="campsite" component={Campsite} title={campsite.nav_header}/>
                        </Stack>

                        <Stack
                            key="moreTab"
                            title="More"
                            icon={TabIcon}
                            navigationBarStyle={navigationStyle}
                            rightTitle="Log Out"
                            onRight={logOutUser}
                        >
                            <Scene key="more" component={More} title="More Options"/>
                        </Stack>

                    </Tabs>
                </Scene>

                <Scene
                    key="filter"
                    component={Filter}
                    title="Filter Your Search"
                    navigationBarStyle={navigationStyle}
                />

            </Stack>
        </Router>
    );
};

const styles = {
    navigationStyle: {
        backgroundColor: darkBlue
    },
    rightFilterStyle: {
        paddingRight: 10,
        color: iOSBlue
    },
    leftListStyle: {
        paddingLeft: 10,
        color: iOSBlue
    }
};

export default RouterComponent;
