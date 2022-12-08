import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { Avatar } from '@rneui/base'
import { StatusBar } from 'expo-status-bar'
import {
  getAuth,
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  db,
} from '../firebase'
import { useRef } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { acceptIncomingCallRequest, callToOtherUser } from "../utils/webRTC/webRTCHandler";
import { callStates, setCallRejected } from "../store/actions/callActions";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTC/webRTCHandler";
import IncomingCallDialog from "../components/IncomingCallDialog/IncomingCallDialog";

const ChatScreen = (props) => {
  const { navigation, route, callState } = props;
  const { userid, guestid, guestusername, avatar, activeUser, callerUsername } = route.params;
  const [ msgInput, setMsgInput ] = useState('')
  const [ messages, setMessages ] = useState([])
  const user = { id: userid }
  const guest = { id: guestid }

  const auth = getAuth()

  useEffect(
    () => {
      const unsub = onSnapshot(
        query(
          collection(
            db,
            "users",
            userid,
            "chatUsers",
            guestid,
            "messages"
          ),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      )
      return () => {
        unsub();
      }
    }, [])

  const sendMsg = () => {
    Keyboard.dismiss()
    try {
      addDoc(
        collection(
          db,
          "users",
          userid,
          "chatUsers",
          guestid,
          "messages"
        ),
          {
          username: auth.currentUser.displayName,
          messageUserId: userid,
          message: msgInput,
          timestamp: serverTimestamp(),
          }
        
      );

      addDoc(
        collection(
          db,
          "users",
          guestid,
          "chatUsers",
          userid,
          "messages"
        ),
        {
          username: auth.currentUser.displayName,
          messageUserId: userid,
          message: msgInput,
          timestamp: serverTimestamp(),
        }
      )
    } catch (error) {
      console.log(error);
    }
    setMsgInput('');
  }

  const startVideoChat = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
      navigation.replace("CallScreen");
    }
  };

  // const sendMsg = async () => {
  //   Keyboard.dismiss()

  //   await addDoc(collection(db, `chats/${route.params.id}`, 'messages'), {
  //     timestamp: serverTimestamp(),
  //     message: msgInput,
  //     displayName: auth.currentUser.displayName,
  //     email: auth.currentUser.email,
  //     photoURL: auth.currentUser.photoURL,
  //   })
  //     .then(() => setMsgInput(''))
  //     .catch((error) => alert(error.message))
  // }

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, `chats/${route.params.id}`, 'messages'),
  //         orderBy('timestamp', 'asc')
  //       ),
  //       (snapshot) => {
  //         setMessages(
  //           snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //         )
  //       }
  //     ),
  //   [route]
  // )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Chat',
      headerShown: true,
      headerBackTitleVisible: false,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar
            rounded
            source={{
              uri: avatar,
            }}
          />
          <Text style={{ color: 'white', marginLeft: 10, fontSize: 18 }}>
            {guestusername}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 40,
          }}
        >
          <TouchableOpacity onPress={() => startVideoChat()}>
            <MaterialCommunityIcons
              name="video"
              size={30}
              color="#efefef"
            />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation, messages])

  const scrollViewRef = useRef();

  return (
    <>
    {callState === callStates.CALL_REQUESTED && navigation.setOptions({headerShown: false})}
    {callState === callStates.CALL_AVAILABLE && navigation.setOptions({headerShown: true})}
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      {callState === callStates.CALL_REQUESTED ? (
        <IncomingCallDialog callerUsername={callerUsername} /> 
      ) : (
        <>
          <StatusBar style="light" />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={100}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <>
                <ScrollView
                  ref={scrollViewRef}
                  onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                  contentContainerStyle={{ paddingTop: 15 }} >
                  {messages && messages.map((message) =>
                    message.messageUserId === auth.currentUser.uid ? (
                      <View key={message.id} style={{ alignItems: 'flex-end' }}>
                        <View style={styles.receiver}>
                          <Avatar
                            rounded
                            source={{ uri: message.photoURL }}
                            size={30}
                            position="absolute"
                            bottom={-15}
                            right={-5}
                            containerStyle={{
                              position: 'absolute',
                              bottom: -15,
                              right: -5,
                            }}
                          />
                          <Text style={styles.receiverText}>{message.message}</Text>
                        </View>
                      </View>
                    ) : (
                      <View key={message.id} style={{ alignItems: 'flex-start' }}>
                        <View style={styles.sender}>
                          <Avatar
                            rounded
                            source={{ uri: avatar }}
                            size={30}
                            position="absolute"
                            bottom={-15}
                            right={-5}
                            containerStyle={{
                              position: 'absolute',
                              bottom: -15,
                              right: -5,
                            }}
                          />
                          <Text style={styles.senderText}>{message.message}</Text>
                          <Text style={styles.senderName}>
                            {message.username}
                          </Text>
                        </View>
                      </View>
                    )
                  )}
                </ScrollView>
                <View style={styles.footer}>
                  <TextInput
                    placeholder="Napisz wiadomość..."
                    style={styles.textInput}
                    value={msgInput}
                    onChangeText={(text) => setMsgInput(text)}
                    onSubmitEditing={sendMsg}
                    onFocus={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                  />
                  <TouchableOpacity onPress={sendMsg} activeOpacity={0.5}>
                    {/* <Ionicons name="send" size="24" color="#2b68e6" /> */}
                    <MaterialCommunityIcons
                      name="send"
                      size={30}
                      color="#2b68e6"
                    />
                  </TouchableOpacity>
                </View>
              </>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
    </>
  )
}
function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

export default connect(mapStoreStateToProps, null)(ChatScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: '#ececec',
    padding: 10,
    color: 'gray',
    borderRadius: 30,
  },
  receiverText: {
    color: 'black',
    fontWeight: "500",
    marginLeft: 1,
  },
  senderText: {
    color: 'white',
    fontWeight: "500",
    marginLeft: 1,
    marginBottom: 10,
  },
  receiver: {
    padding: 15,
    backgroundColor: '#ececec',
    alignItems: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignItems: 'flex-start',
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
  },
  senderName: {
    left: 1,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },
})