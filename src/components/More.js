import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from './common';

class More extends Component {
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

export default More;