// 3rd party libraries - core
import React from 'react';
import {Button} from 'react-native-elements';
import {linkColorBlue} from "../../styles";
import {StyleSheet} from "react-native";
// 3rd party libraries - additional
// styles and language


const NavbarButton = ({buttonStyleOverride, textStyleOverride, title, onPress}) => {
    const {buttonStyle, textStyle} = styles;

    return (
        <Button
            transparent
            title={title}
            titleStyle={textStyleOverride ? [textStyle, textStyleOverride] : textStyle}
            buttonStyle={buttonStyleOverride ? [buttonStyle, buttonStyleOverride] : buttonStyle}
            onPress={onPress}
        />


    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    textStyle: {
        color: linkColorBlue
    }
});


export {NavbarButton};
