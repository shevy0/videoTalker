import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MessageDisplayer = (props) => {
  return (
    <Text style={styles.messagePop}>
      {props.message}
    </Text>
  )
}

export default MessageDisplayer

const styles = StyleSheet.create({
  messagePop: {
    backgroundColor: "green",
    color: "black",
    position: "absolute",
    bottom: "27%",
    right: "5%",
    fontSize: 18,
    padding: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    textAlign: "center",
  },
})