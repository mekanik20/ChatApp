import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, Image, Stylesheet } from 'react-native';

import icon from '../assets/usericon.png';

export default class Start extends React.Component {



  render() {
    return (
      <View>
        <ImageBackground source={BackgroundImage}>

        </ImageBackground>
        <Text>Hello Screen1!</Text>
        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat')}
        />
      </View>
    )
  }
}