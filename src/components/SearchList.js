import React, {Component} from 'react';
import {Platform, Text} from 'react-native';
import {Button} from 'react-native-elements';


import {CardSection, Card} from './common/index';

class SearchList extends Component {

    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        List Results of Sites
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default SearchList;
