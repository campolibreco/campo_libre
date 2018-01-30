import React, {Component} from 'react';
import {Text} from 'react-native';
import {Icon} from 'react-native-elements';

import {CardSection, Card} from '../components/common/index';

class MoreScreen extends Component {
    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: 'More',
            headerTitle: 'More Options',
            headerLeft: null,
            tabBarIcon: ({focused, tintColor }) => (<Icon type='ionicon' name={focused ? 'ios-more' : 'ios-more-outline'} size={25} color={tintColor} />)
        }

    };

    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        More
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default MoreScreen;