import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from './common';

class Dashboard extends Component {
    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        Dashboard
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default Dashboard;