import React from 'react';
import { View, Text, TextInput, Button, ImageBackground, Image, Stylesheet } from 'react-native';
import BackgroundImage from '../assets/background-image.png';
import icon from '../assets/usericon.png';

export default class Start extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      bgColor: this.colors.blue
    };
  }

  // background color option function for user
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  //user background color choices
  colors = {
    gold: '#9D7F15',
    blue: '#1B70A0',
    pink: '#931560',
    dark: '#090C08',
    green: '#B9C6AE',
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage} resizeMode='cover' style={styles.backgroundImage}>

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