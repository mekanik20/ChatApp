import React from 'react';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
//import { initializeApp } from 'firebase/app';
//import { getAuth } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';
//import { getStorage } from 'firebase/storage';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      isConnected: false,
      image: null,
      location: null,
    };

    //configuration code for database
    const firebaseConfig = {
      apiKey: "AIzaSyBHZgf5kDld1Iab-wH2jxGJNfT7bvxzuoQ",
      authDomain: "meet-app-332600.firebaseapp.com",
      projectId: "meet-app-332600",
      storageBucket: "meet-app-332600.appspot.com",
      messagingSenderId: "959923794146",
      appId: "1:959923794146:web:bebbdc9587b2f8887f6ebb",
      //measurementId: "G-2N0T0MSKEJ"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      /*const firestore = firebase.firestore();
      firestore.settings({ ignoreUndefinedProperties: true });*/
    }

    //creates a reference to Firestore and then stores and retrieves messages from user
    this.referenceChatmessages = firebase.firestore().collection('messages');
    this.refMsgsUser = null;
  }

  //get messages from async storage
  getMessages = async () => {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete messages from async storage (dev only)
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  //save messages to async storage
  saveMessages = async () => {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  //add static messages to messages state
  componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    //this.referenceChatmessages = firebase.firestore().collection('messages');

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
        this.unsubscribe = this.referenceChatmessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);

        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            return await firebase.auth().signInAnonymously();
          }

          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: 'https://placeimg.com/140/140/any',
            },
          });

          this.refMsgsUser = firebase
            .firestore()
            .collection('messages')
            .where('uid', '==', this.state.uid);
        });

        this.saveMessages();
      } else {
        //if user is offline
        this.setState({ isConnected: false });
        console.log('offline');
        this.getMessages();
      }
    });
  }
  /*retrieves the current data in 'messages' collection and stores it in the state
  'messages to render it in view */
  onCollectionUpdate = (QuerySnapshot) => {
    const messages = [];
    // go through each document
    QuerySnapshot.forEach((doc) => {
      //get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages: messages,
    });
    this.saveMessages();
  };

  //function to stop listening for authentication and changes
  componentWillUnmount() {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        //stop listening to authentication
        this.authUnsubscribe();
        //stop listening for changes
        this.unsubscribe();
      }
    });
  }

  //changes input bar display based on if user is offline or online
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar {...props} />
      );
    }
  }

  //add last message to Firestore
  addMessages() {
    const message = this.state.messages[0];
    this.referenceChatmessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: this.state.user,
      image: message.image || '',
      location: message.location || null,
    });
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
        this.saveMessages();
      }
    );
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

  /*rendering GiftedChat in the view and making sure input field is not covered by the 
  Android keyboard*/
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
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
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


