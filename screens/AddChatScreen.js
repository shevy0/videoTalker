import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from '@rneui/base'
import Icon from 'react-native-vector-icons/FontAwesome'
import { collection, addDoc, db } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const AddChatScreen = () => {
  const [chat, setChat] = useState('')
  const navigation = useNavigation()

  const createChat = async () => {
    await addDoc(collection(db, 'chats'), {
      chatName: chat,
    })
      .then(() => navigation.goBack())
      .catch((error) => alert(error.message))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Utwórz czat',
      headerBackTitle: 'Chats',
    })
  })

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Input
        placeholder="Wprowadź nazwę"
        value={chat}
        onChangeText={(text) => setChat(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" size={18} type="antdesign" color="black" />
        }
      />
      <Button disabled={!chat} onPress={createChat} title="Utwórz nowy czat" />
    </KeyboardAvoidingView>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
})