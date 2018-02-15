import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class largeFormElement extends Component {


  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40}
      />
    );
  }
}

export default largeFormElement
