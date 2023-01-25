import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import ActiveUsersList from "../components/ActiveUsersList/ActiveUsersList";
import * as webRTCHandler from "../utils/webRTC/webRTCHandler";
import { callStates, setCallRejected } from "../store/actions/callActions";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import IncomingCallDialog from "../components/IncomingCallDialog/IncomingCallDialog";
import { launchImageLibrary } from "react-native-image-picker";
import { getAuth, updateProfile, setDoc, collection, db, onSnapshot, query, where, signOut } from "../firebase";
import { Image } from "@rneui/base";
import { doc, getDoc, snapshotEqual } from "firebase/firestore";
import { ListItem, Avatar } from '@rneui/base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { disconnect } from "../utils/wssConnection/wssConnection";

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')

  const auth = getAuth()

  const userid = auth.currentUser.uid;

  const {
    localStream,
    remoteStream,
    callState,
    callingDialogVisible,
    callerUsername,
    callRejected,
    hideCallRejectedDialog,
  } = props;

  const changePhoto = () => {
    const options = {
      includeBase64: true,
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) console.log("Image picker cancelled")
      else {
        const image = `data:image/*;base64,${response.assets[0].base64}`
        setDoc(
          doc(
            db,
            "users",
            auth.currentUser.uid,
          ),
          {
            avatar: image,
          }
        );
      }
    })
  }

  const getAvatar = () => {
    const docRef = doc(db, "users", userid);
    const unsub = onSnapshot(docRef, (doc) => {
      if (doc.data() !== undefined)
      setAvatar(doc.data().avatar)
    })
  }

  useEffect(() => {
    getAvatar()
    webRTCHandler.getLocalStream();
  }, []);

  return (
    <View style={styles.container}>
      {callState === callStates.CALL_REQUESTED ? (
        <IncomingCallDialog callerUsername={callerUsername} />
      ) : (
        <>
          <View style={styles.upperElements}>
            <TouchableOpacity onPress={changePhoto} style={styles.changePhoto}>
              <Text style={styles.changePhotoText}>Edytuj</Text>
            </TouchableOpacity>

            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: avatar,
              }}
            />
            <Text style={styles.text}>{auth.currentUser.displayName}</Text>
          </View>
          <SafeAreaView style={{ height: "100%" }}>
              <ActiveUsersList />
          </SafeAreaView>
        </>
      )}

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
    backgroundColor: "white",
    padding: 15,
    flex: 1,
  },
  changePhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    margin: 2,
    width: 70,
    height: 30,
    borderRadius: 20,
    padding: 2
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  upperElements: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
