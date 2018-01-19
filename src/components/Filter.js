import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from './common';

class Filter extends Component {
    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        Filter
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default Filter;