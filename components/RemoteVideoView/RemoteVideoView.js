import { StyleSheet, Text, View } from "react-native";
import React, { userRef, useEffect } from "react";
import { RTCView } from "react-native-webrtc";

const RemoteVideoView = (props) => {
  const { remoteStream } = props;

  return (
    <RTCView
      style={styles.video}
      objectFit={"cover"}
      mirror={true}
      streamURL={remoteStream ? remoteStream.toURL() : ""}
    />
  );
};

export default RemoteVideoView;

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
