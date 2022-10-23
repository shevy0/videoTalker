import { StyleSheet, Text, View } from "react-native";
import React, { userRef, useEffect } from "react";
import { RTCView } from "react-native-webrtc";

const LocalVideoView = (props) => {
  const { localStream } = props;

  return (
    <RTCView
      style={styles.video}
      objectFit={"cover"}
      mirror={true}
      streamURL={localStream ? localStream.toURL() : ""}
    />
  );
};

export default LocalVideoView;

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    width: 100,
    height: 150,
    top: 10,
    left: 10,
    elevation: 10,
  },
});
