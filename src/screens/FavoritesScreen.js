import React, {Component} from 'react';
import {Text} from 'react-native';
import {Icon} from 'react-native-elements';

import { badgeGreen, limeGreenTitle, linkColorBlue , blueGreenNav} from '../styles/index';
import {CardSection, Card} from '../components/common/index';
import MapScreen from "../components/SearchMap";

class FavoritesScreen extends Component {
    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: 'Favorites',
            headerTitle: 'Your Favorite Campsites',
            headerTitleStyle: {
              color:'white'
             },
             headerStyle: {
              backgroundColor: blueGreenNav
             },
            headerLeft: null,
            tabBarIcon: ({focused, tintColor }) => (<Icon type='ionicon' name={focused ? 'ios-heart' : 'ios-heart-outline'} size={25} color={tintColor} />)
        }

    };

    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        Favorite sites go here!
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default FavoritesScreen;
