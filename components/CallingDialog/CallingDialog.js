import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { hangUp } from "../../utils/webRTC/webRTCHandler";

const CallingDialog = () => {

  const handleHangUpButtonPressed = () => {
    hangUp();
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Nawiązuję połączenie...</Text>
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
      </View>
    </View>
  );
};

export default CallingDialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptIcon: {
    backgroundColor: "red",
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    margin: 10,
  },
});
