import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from './common';

class Favorites extends Component {
    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        Favorites
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default Favorites;