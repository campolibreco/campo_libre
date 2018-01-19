import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from './common';

class Map extends Component {
    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        Map
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default Map;