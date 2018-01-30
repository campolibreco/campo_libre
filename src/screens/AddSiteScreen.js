import React, {Component} from 'react';
import {Text} from 'react-native';
import {Icon} from 'react-native-elements';

import {campsite} from '../locale.en';
import {backgroundLogo} from '../styles/index';

import {CardSection, Card, Input, Button} from '../components/common/index';

class AddSiteScreen extends Component {
    static navigationOptions = (props) => {
        const {navigation: {navigate}} = props;

        return {
            title: 'Add a Site',
            headerTitle: 'Add a Campsite',
            headerLeft: null,
            tabBarIcon: ({focused, tintColor }) => (<Icon type='material-community' name={focused ? 'tent' : 'tent'} size={25} color={tintColor} />)
        }

    };

    render(){
        const {containerStyle, descriptionStyle, sectionStyle} = styles;

        return(
            <Card style={containerStyle}>
                <CardSection style={sectionStyle}>
                    <Text style={descriptionStyle}>
                        {campsite.description}
                    </Text>
                </CardSection>

                <CardSection style={sectionStyle}>
                    <Button

                    >
                        {campsite.upload}
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: backgroundLogo
    },
    descriptionStyle: {
        padding: 10,
        backgroundColor: backgroundLogo,
        fontSize: 15
    },
    sectionStyle: {
        backgroundColor: backgroundLogo
    }
}

export default AddSiteScreen;