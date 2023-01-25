import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { setUserName, setUserID } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '../firebase'
const backImage = require("../assets/pole.jpg");

const LoginScreen = ({ saveUserName, saveUserID }) => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = getAuth()

  const loginUser = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          registerNewUser(auth.currentUser.displayName, auth.currentUser.uid);
          saveUserName(auth.currentUser.displayName);
          saveUserID(auth.currentUser.uid);
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/user-not-found':
              Alert.alert("Wystąpił błąd:", "Nie znaleziono użytkownika.")
              break;
            case 'auth/invalid-email':
              Alert.alert("Wystąpił błąd:", "Nieprawidłowe dane logowania.")
              break;
            case 'auth/internal-error':
              Alert.alert("Wystąpił błąd:", "Nieprawidłowe dane logowania.")
              break;
            default:
              Alert.alert("Wystąpił błąd:", error.message)
              break;
          }
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Logowanie</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          //autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => loginUser()}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Zaloguj</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Nie posiadasz konta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: 'green', fontWeight: '600', fontSize: 14 }}> Zarejestruj się</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    saveUserName: username => dispatch(setUserName(username)),
    saveUserID: userid => dispatch(setUserID(userid))
  };
};

export default connect(null, mapActionsToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "green",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: 'green',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
})