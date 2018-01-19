import React, {Component} from 'react';
import {Text} from 'react-native';

import {campsite} from '../locale.en';
import {backgroundLogo} from '../styles';

import {CardSection, Card, Input, Button} from './common';

class Campsite extends Component {
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

export default Campsite;