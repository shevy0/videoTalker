import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { callToOtherUser } from "../../utils/webRTC/webRTCHandler";
import { callStates } from "../../store/actions/callActions";
import { connect } from "react-redux";

const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;

  const navigation = useNavigation();

  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
      navigation.replace("CallScreen");
    }
  };

  return (
    <TouchableOpacity onPress={handleListItemPressed}>
      <View style={styles.row}>
        {/* Image */}
        <View style={styles.starredIcon}>
          <AntDesign name="user" size={30} color="#efefef" />
        </View>
        {/* Text */}
        <Text style={styles.text}>{activeUser.username}</Text>
      </View>
    </TouchableOpacity>
  );
};

function mapStoreStateToProps({ call }) {
  return {
    ...call,
  };
}

export default connect(mapStoreStateToProps, null)(ActiveUsersListItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  starredIcon: {
    backgroundColor: "#333333",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    color: "white",
    paddingLeft: 15,
    fontSize: 18,
  },
});
