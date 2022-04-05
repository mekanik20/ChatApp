import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import BackgroundImage from '../assets/background-image.png';
import icon from '../assets/icon.png';

export default class Start extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      bgColor: this.colors.blue,
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
    green: '#8fce00',
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode='cover'
          style={styles.backgroundImage}
        >
          <View style={styles.titleBox}>
            <Text style={styles.title}>ChatApp</Text>
          </View>

          <View style={styles.box1}>
            <View style={styles.inputBox}>
              <Image source={icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder='Type your name here'
              />
            </View>

            <View style={styles.colorBox}>
              <Text style={styles.chooseColor}>
                {" "}
                Choose your background color!{" "}
              </Text>
            </View>

            {/* Background colors live here */}
            <View style={styles.colorArray}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='gold background'
                accessibilityHint='Allows you to add a gold background to the chat'
                accessibilityRole='button'
                style={styles.color1}
                onPress={() => this.changeBgColor(this.colors.gold)}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='blue background'
                accessibilityHint='Allows you to add a blue background to the chat'
                accessibilityRole='button'
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.blue)}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='pink background'
                accessibilityHint='Allows you to add a pink background to the chat'
                accessibilityRole='button'
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.pink)}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='dark background'
                accessibilityHint='Allows you to add a dark background to the chat'
                accessibilityRole='button'
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.dark)}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel='green background'
                accessibilityHint='Allows you to add a green background to the chat'
                accessibilityRole='button'
                style={styles.color5}
                onPress={() => this.changeBgColor(this.colors.green)}
              ></TouchableOpacity>
            </View>

            {/*This will allow the user to click on a button and be redirected to the chat page */}
            <Pressable
              accessible={true}
              accessibilityLabel='Go to the chat page'
              accessibilityHint='Allows you to go to the chat page'
              accessibilityRole='button'
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }
            >
              <Text style={styles.buttonText}>Take Me To Chat!</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Creating the app's stylesheet, fixing sizes, centering items, changing colors
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleBox: {
    height: '50%',
    width: '88%',
    alignItems: 'center',
    paddingTop: 100,
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  box1: {
    backgroundColor: 'white',
    height: '46%',
    width: '88%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  inputBox: {
    borderWidth: 2,
    borderRadius: 1,
    borderColor: 'grey',
    width: '88%',
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  input: {
    fontSize: 16,
    fontWeight: '800',
    color: '#757083',
    opacity: 0.5,
  },

  colorBox: {
    marginRight: 'auto',
    paddingLeft: 15,
    width: '88%',
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },

  colorArray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  color1: {
    backgroundColor: '#9D7F15',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color2: {
    backgroundColor: '#1B70A0',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color3: {
    backgroundColor: '#931560',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color4: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  color5: {
    backgroundColor: '#8fce00',
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  button: {
    width: '88%',
    height: 70,
    borderRadius: 8,
    backgroundColor: '#1D6085',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
