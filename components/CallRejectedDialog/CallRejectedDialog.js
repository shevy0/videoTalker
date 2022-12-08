import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { resetCallData } from '../../utils/webRTC/webRTCHandler';
import { useNavigation } from '@react-navigation/native';

const CallRejectedDialog = ({ reason, hideCallRejectedDialog }) => {

  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      resetCallData()
      hideCallRejectedDialog({
        rejected: false,
        reason: ''
      });
      navigation.goBack();
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{color: "black"}}>{reason}</Text>
    </View>
  )
}

export default CallRejectedDialog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
})