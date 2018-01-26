import React, {Component} from 'react';
import {Text} from 'react-native';


import {CardSection, Card} from '../components/common/index';

class ListScreen extends Component {
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

export default ListScreen;