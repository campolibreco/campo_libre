import React, {Component} from 'react';
import {Text, View} from 'react-native';


const Header = ({headerText}) => {
    const {textStyle, viewStyle} = styles;

    return (
        // <View style={viewStyle}>
        <View>
            <Text style={textStyle}>dog</Text>
        </View>
    );
};

const styles = {
    textStyle: {
        fontSize: 20
    }
    // viewStyle: {
    //     backgroundColor: '#F8F8F8',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: 60,
    //     paddingTop: 15,
    //     shadowColor: '#000',
    //     shadowOffset: {width: 0, height: 5},
    //     shadowOpacity: 0.3,
    //     elevation: 2,
    //     position: 'relative'
    //
    // }
};

export {Header};
