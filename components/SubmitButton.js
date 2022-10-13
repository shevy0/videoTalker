import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SubmitButton = (props) => {
    const { handleSubmitButtonPressed } = props;

  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleSubmitButtonPressed}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Zaloguj</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'green',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },  
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})