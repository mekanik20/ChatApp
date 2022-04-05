import React from 'react';
import { View } from 'react-native';

export default class Chat extends React.Component {
  render() {
    let { bgColor } = this.props.route.params;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      >
      </View>
    )
  }
}