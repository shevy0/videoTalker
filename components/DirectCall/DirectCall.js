import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React from "react";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CallingDialog from "../CallingDialog/CallingDialog";
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog";
import {
  callStates,
  setCallRejected,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
  setMessage,
} from "../../store/actions/callActions";
import ConversationButtons from "../ConversationButtons/ConversationButtons";
import Messenger from "../Messenger/Messenger";

const DirectCall = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    message,
    setDirectCallMessage,
  } = props;

  const navigation = useNavigation();

  return (
    <>
      {callState === callStates.CALL_AVAILABLE &&
        !callRejected.rejected &&
        navigation.replace("Home")}
      <KeyboardAvoidingView style={styles.videoContainer}>
        <View style={[styles.videos, styles.localVideos]}>
          <LocalVideoView localStream={localStream} />
        </View>
        <View style={[styles.videos, styles.remoteVideos]}>
          {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
            <RemoteVideoView remoteStream={remoteStream} />
          )}
          {callingDialogVisible && <CallingDialog />}
          {callRejected.rejected && (
            <CallRejectedDialog
              reason={callRejected.reason}
              hideCallRejectedDialog={hideCallRejectedDialog}
            />
          )}
        </View>
        {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
          <Messenger
            message={message}
            setDirectCallMessage={setDirectCallMessage}
          />
        )}
        {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
          <ConversationButtons {...props} />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) =>
      dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) =>
      dispatch(setLocalMicrophoneEnabled(enabled)),
    setDirectCallMessage: (received, content) =>
      dispatch(setMessage(received, content)),
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    minHeight: 450,
  },
  videos: {
    width: "100%",
    flex: 1,
    position: "relative",
    overflow: "hidden",
    borderRadius: 6,
  },
  localVideos: {
    height: 100,
    marginBottom: 10,
  },
  remoteVideos: {
    height: 400,
  },
});
