import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from './common';

class Search extends Component {
    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        Search
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default Search;