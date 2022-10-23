import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import DirectCall from "../components/DirectCall/DirectCall";

const CallScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: "100%" }}>
        <DirectCall />
      </SafeAreaView>
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    padding: 15,
  },
});
