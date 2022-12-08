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
    backgroundColor: "white",
    padding: 15,
  },
});
