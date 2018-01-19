import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {highlightGreen, highlightBlue} from '../../styles';

const PasswordInput = ({label, value, onChangeText, placeholder, hidden, onPress}) => {
    const {textInputStyle, labelStyle, containerStyle, eyeStyle} = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={hidden}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={textInputStyle}
                autoCorrect={false}
            />
            <TouchableOpacity
                style={eyeStyle}
                onPress={onPress}
            >
                <Icon name={hidden ? 'ios-eye' : 'ios-eye-off'} size={30}
                      color={hidden ? highlightGreen : highlightBlue}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    textInputStyle: {
        height: 20,
        width: 100,
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 10
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 5
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    eyeStyle: {
        flex: 2
    }
};

export {PasswordInput};