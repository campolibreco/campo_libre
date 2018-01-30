import React, {Component} from 'react';
import {Text} from 'react-native';



import {CardSection, Card} from '../components/common/index';
import MapScreen from "../components/SearchMap";

class FilterScreen extends Component {

    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            headerTitle: 'Filter Your Search'
        }

    };


    render(){
        return(
            <Card>
                <CardSection>
                    <Text>
                        Filter your sites
                    </Text>
                </CardSection>
            </Card>
        );
    }
}

export default FilterScreen;