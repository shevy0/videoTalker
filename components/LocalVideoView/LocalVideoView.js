import { StyleSheet, Text, View } from 'react-native'
import React, { userRef, useEffect } from 'react'
import { RTCView } from 'react-native-webrtc';

const LocalVideoView = props => {
    const { localStream } = props;

  return (
    <View>
      <RTCView style={styles.video} zOrder={0} objectFit={"cover"} mirror={true} streamURL={localStream ? localStream.toURL() : ''}/>
    </View>
  )
}

export default LocalVideoView

const styles = StyleSheet.create({
    video: {
      backgroundColor: '#f2f2f2',
      height: '100%',
      width: '100%',
    },
  });