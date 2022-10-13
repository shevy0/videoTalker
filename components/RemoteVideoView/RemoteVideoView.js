import { StyleSheet, Text, View } from 'react-native'
import React, { userRef, useEffect } from 'react'
import { RTCView } from 'react-native-webrtc';

const RemoteVideoView = props => {
    const { remoteStream } = props;

  return (
    <View>
      <RTCView style={styles.video} zOrder={0} objectFit={"cover"} mirror={true} streamURL={remoteStream ? remoteStream.toURL() : ''}/>
    </View>
  )
}

export default RemoteVideoView

const styles = StyleSheet.create({
    video: {
      backgroundColor: '#f2f2f2',
      height: '100%',
      width: '100%',
    },
  });