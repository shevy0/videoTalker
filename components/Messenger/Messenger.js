import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { sendMessageUsingDataChannel } from "../../utils/webRTC/webRTCHandler";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MessageDisplayer from "./MessageDisplayer";

const Messenger = ({ message, setDirectCallMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnKeyDownEvent = () => {
      sendMessageUsingDataChannel(inputValue);
      setInputValue('');
  };

  useEffect(() => {
    if (message.received) {
        setTimeout(() => {
            setDirectCallMessage(false, '');
        }, 3000);
    }
  }, [message.received]);

  return (
    <>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Wiadomość"
            value={inputValue}
            onChangeText={(text) => {
              setInputValue(text);
            }}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={handleOnKeyDownEvent}>
          <View style={styles.rejectIcon}>
            <MaterialCommunityIcons name="send" size={20} color="#efefef" />
          </View>
        </TouchableOpacity>
      </View>
      {message.received && <MessageDisplayer message={message.content} />}
    </>
  );
};

export default Messenger;

const styles = StyleSheet.create({
  inputContainer: {
    width: "40%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 14,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectIcon: {
    backgroundColor: "grey",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    margin: 10,
  },
});
