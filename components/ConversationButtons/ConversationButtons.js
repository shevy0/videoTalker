import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { hangUp } from "../../utils/webRTC/webRTCHandler";

const ConversationButtons = (props) => {
  const {
    localStream,
    setCameraEnabled,
    setMicrophoneEnabled,
    localCameraEnabled,
    localMicrophoneEnabled,
  } = props;

  let isMuted = false;

  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicrophoneEnabled(!micEnabled);
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={handleHangUpButtonPressed}>
        <View style={styles.acceptIcon}>
          <MaterialCommunityIcons
            name="phone-hangup"
            size={30}
            color="#efefef"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMicButtonPressed}>
        <View style={styles.rejectIcon}>
          {localMicrophoneEnabled ? (
            <MaterialCommunityIcons
              name="microphone"
              size={30}
              color="#efefef"
            />
          ) : (
            <MaterialCommunityIcons
              name="microphone-off"
              size={30}
              color="#efefef"
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ConversationButtons;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptIcon: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    margin: 10,
  },
  rejectIcon: {
    backgroundColor: "grey",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    margin: 10,
  },
});
