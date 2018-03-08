import React, {Component} from 'react';
import {Text, View} from 'react-native';


const Header = ({headerText}) => {
    const {textStyle, viewStyle} = styles;

    return (
        <View>
            <Text style={textStyle}></Text>
        </View>
    );
};

const styles = {
    textStyle: {
        fontSize: 20
    }

};

export {Header};
