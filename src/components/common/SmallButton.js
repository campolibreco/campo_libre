// 3rd party libraries - core
import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {
    facebookBlueButtonTransparent, headerWhite, headerWhiteTransparent, navyBlueButtonTransparent,
    overlayBlue
} from "../../styles";
import {StyleSheet} from "react-native";
// 3rd party libraries - additional
// styles and language



const SmallButton = ({iconType, iconName, iconColor, iconSizeOverride, buttonStyleOverride, title, onPress}) => {
    const {buttonStyle} = styles;

    return (
        <Button
            transparent
            icon={<Icon type={iconType} name={iconName} size={iconSizeOverride || 25} color={iconColor}/>}
            title={title}
            buttonStyle={buttonStyleOverride? [buttonStyle, buttonStyleOverride]: buttonStyle}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        height: 70,
        borderRadius: 40,
        width: 150
    }
});


export {SmallButton};
