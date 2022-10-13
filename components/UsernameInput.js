import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const UsernameInput = (props) => {
  const { username, setUserName } = props;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Nazwa użytkownika"
        value={username}
        //onChange={(event) => {setUserName(event.nativeEvent.text)}}
        onChangeText={(text) => {
          setUserName(text);
        }}
        style={styles.input}
      />
    </View>
  );
};

export default UsernameInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 10,
  },
});
