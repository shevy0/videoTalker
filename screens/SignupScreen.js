import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { connect } from 'react-redux';
import { setUserName, setUserID } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
const backImage = require("../assets/pole.jpg");

const Signup = ({ saveUserName, saveUserID }) => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [imageurl, setImageurl] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
  const auth = getAuth();

  const registerUser = async () => {
    try {
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        const user = authUser.user
        updateProfile(user, { displayName: firstName })
        registerNewUser(firstName);
        saveUserName(firstName);
        saveUserID(authUser.user.uid);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert("Wystąpił błąd:", "Adres e-mail jest już używany.")
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
    } catch(error) {
      console.log(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Rejestracja</Text>
        <TextInput
          style={styles.input}
          placeholder="Imię"
          autoFocus={true}
          onChangeText={(firstName) => setFirstName(firstName)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
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
        <TouchableOpacity style={styles.button} onPress={() => registerUser(email, password, firstName)}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Utwórz konto</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Masz już konto? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: 'green', fontWeight: '600', fontSize: 14 }}> Zaloguj się</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    saveUserName: username => dispatch(setUserName(username)),
    saveUserID: userid => dispatch(setUserID(userid)),
  };
};

export default connect(null, mapActionsToProps)(Signup);

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
    height: '78%',
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
});