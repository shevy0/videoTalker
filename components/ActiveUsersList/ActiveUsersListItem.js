import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { ListItem, Avatar } from '@rneui/base';
import { getAuth, onSnapshot, query, collection, db, orderBy } from '../../firebase';
import { doc } from "firebase/firestore";

const ActiveUsersListItem = (props) => {
  const { activeUser, userid, callerUsername } = props;
  const [ messages, setMessages ] = useState([])
  const [ avatar, setAvatar ] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')

  const navigation = useNavigation();

  const auth = getAuth()

  const guestid = activeUser.userid;
  const guestusername = activeUser.username;

  const getAvatar = () => {
    const docRef = doc(db, "users", guestid);
    onSnapshot(docRef, (doc) => {
      if (doc.data() !== undefined)
      setAvatar(doc.data().avatar)
    })
  }

  useEffect(
    () => {
      getAvatar()
    },
    []
  )

  useEffect(
    () => {
      const unsub = onSnapshot(
        query(
          collection(
            db,
            "users",
            userid,
            "chatUsers",
            guestid,
            "messages"
          ),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      )
      return () => {
        unsub();
      }
    }, [])

  const handleListItemPressed = () => {
    navigation.navigate("ChatScreen", {
      userid,
      guestid,
      guestusername,
      avatar: avatar,
      activeUser,
      callerUsername
    })
  }

  // const handleListItemPressed = () => {
  //   if (callState === callStates.CALL_AVAILABLE) {
  //     callToOtherUser(activeUser);
  //     navigation.replace("CallScreen");
  //   }
  // };

  return (
    // <TouchableOpacity onPress={handleListItemPressed}>
    //   <View style={styles.row}>
    //     {/* Image */}
    //     <View style={styles.starredIcon}>
    //       <AntDesign name="user" size={30} color="#efefef" />
    //     </View>
    //     {/* Text */}
    //     <Text style={styles.text}>{activeUser.username}</Text>
    //   </View>
    // </TouchableOpacity>
    <ListItem onPress={handleListItemPressed}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: avatar,
          }}
        />
      <ListItem.Content>
        <ListItem.Title style={styles.text}>{activeUser.username}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {messages?.[0]?.username}: {messages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

function mapStoreStateToProps({ call, dashboard }) {
  return {
    ...call,
    ...dashboard
  };
}

export default connect(mapStoreStateToProps, null)(ActiveUsersListItem);

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 18,
  },
});
