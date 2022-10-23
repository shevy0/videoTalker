import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import ActiveUsersList from "../components/ActiveUsersList/ActiveUsersList";
import * as webRTCHandler from "../utils/webRTC/webRTCHandler";
import { callStates, setCallRejected } from "../store/actions/callActions";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import IncomingCallDialog from "../components/IncomingCallDialog/IncomingCallDialog";

const HomeScreen = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callingDialogVisible,
    callerUsername,
    callRejected,
    hideCallRejectedDialog,
  } = props;

  const navigation = useNavigation();

  useEffect(() => {
    webRTCHandler.getLocalStream();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: "100%" }}>
        {callState === callStates.CALL_REQUESTED ? (
          <IncomingCallDialog callerUsername={callerUsername} />
        ) : (
          <ActiveUsersList />
        )}
      </SafeAreaView>
    </View>
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
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    padding: 15,
  },
});
