import React from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'You are connected to the chat',
          createdAt: new Date(),
          system: true,
        },
      ],
    }
  }

  //add static messages to messages state
  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'white'
          },
          right: {
            backgroundColor: 'gray'
          }
        }}
      />
    )
  }

  //rendering GiftedChat in the view and making sure input field is not covered by the Android
  //keyboard
  render() {
    let { bgColor } = this.props.route.params;

    return (
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  giftedChat: {
    flex: 1,
    width: "100%",
    paddingBottom: 10,
    justifyContent: "center",
    borderRadius: 5,
  },
});


