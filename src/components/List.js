import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from './common';

class List extends Component {
    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        List
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default List;