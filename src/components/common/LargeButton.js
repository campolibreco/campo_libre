// 3rd party libraries - core
import React from 'react';
import {Button, Icon} from 'react-native-elements';
import {StyleSheet} from "react-native";
// 3rd party libraries - additional
// styles and language



const LargeButton = ({iconType, iconName, iconColor, iconSizeOverride, buttonStyleOverride, title, onPress}) => {
    const {buttonStyle} = styles;

    return (
        <Button
            large
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
        margin: 30,
        height: 70,
        borderRadius: 40
    }
});


export {LargeButton};
