import React, {Component} from 'react';
import {Text} from 'react-native';
import {Icon} from 'react-native-elements';
import { Button, FormLabel } from 'react-native-elements';

import {campsite} from '../locale.en';
import {navyBlue, grey, darkBlue, lightwhiteblue} from '../styles/index';

import {CardSection, Card, Input} from '../components/common/index';

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
        const { buttonStyle } = styles;

        return(
            <Card>
                <CardSection>
                    <Text>
                        {campsite.description}
                     </Text>
                    <Input/>
                 </CardSection>
                    <Button
                      large
                      rounded={true}
                      buttonStyle={buttonStyle}
                      icon={{name: 'plus', type: 'font-awesome'}}
                      title='Add A Site'
                    >
                        {campsite.upload}
                    </Button>
            </Card>
        );
    }
}

const styles = {

    descriptionStyle: {
        color: darkBlue,
        fontSize: 15
    },
    sectionStyle: {
        backgroundColor: grey
    },
    buttonStyle:{
      marginTop: 10,
      backgroundColor: navyBlue
    }
}

export default AddSiteScreen;
