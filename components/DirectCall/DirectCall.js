import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
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
      {callingDialogVisible && <CallingDialog />}
      {callRejected.rejected && (
        <CallRejectedDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {remoteStream && localStream && (
        <SafeAreaView style={styles.videoContainer}>
          <RemoteVideoView remoteStream={remoteStream} />
          <LocalVideoView localStream={localStream} />

          {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
            <Messenger
              message={message}
              setDirectCallMessage={setDirectCallMessage}
            />
          )}
          {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
            <ConversationButtons {...props} />
          )}
        </SafeAreaView>
      )}
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
