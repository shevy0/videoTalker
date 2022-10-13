import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import UsernameInput from '../components/UsernameInput';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { setUserName } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';

const LoginScreen = ({ saveUserName }) => {
    const [ username, setUserName ] = useState('')

    const navigation = useNavigation()

    const handleSubmitButtonPressed = () => {
        registerNewUser(username);
        saveUserName(username);
        navigation.replace("Home");   
    };

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <UsernameInput username={username} setUserName={setUserName} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
    </KeyboardAvoidingView>
  )
}

const mapActionsToProps = (dispatch) => {
    return {
        saveUserName: username => dispatch(setUserName(username))
    };
};

export default connect(null, mapActionsToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
})