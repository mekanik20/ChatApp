import React from 'react';
import { View, Text, Button, TextInput, ImageBackground, Stylesheet } from 'react-native';

export default class Start extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to chat"
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
        />
      </View>
    )
  }
}