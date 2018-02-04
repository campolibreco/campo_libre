import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FormInput} from 'react-native-elements'
import {highlightGreen, highlightBlue} from '../../styles';

const PasswordInput = ({label, value, onChangeText, placeholder, hidden, onPress}) => {

    return (
        <View>
            <FormInput
                secureTextEntry={hidden}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
            />
        </View>
    );
};
// <TouchableOpacity
//     onPress={onPress}
// >
//     <Icon name={hidden ? 'ios-eye' : 'ios-eye-off'} size={30}
//           color={hidden ? highlightGreen : highlightBlue}/>
// </TouchableOpacity>


export {PasswordInput};
