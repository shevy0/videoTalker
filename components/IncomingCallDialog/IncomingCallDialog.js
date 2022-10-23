import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import { acceptIncomingCallRequest, rejectIncomingCallRequest, resetCallData } from '../../utils/webRTC/webRTCHandler';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IncomingCallDialog = (props) => {
    const { callerUsername } = props;

    const navigation = useNavigation();

const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest();
    navigation.navigate("CallScreen");
}

const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest();
}

  return (
    <View style={styles.container}>
      <Text style={{color: "white"}}>{callerUsername} dzwoni...</Text>
        <View style={styles.row}>
            {/* Image */}
            <TouchableOpacity
                onPress={handleAcceptButtonPressed}
            >
                <View style={styles.acceptIcon}>
                    <MaterialCommunityIcons name="phone" size={30} color="#efefef" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleRejectButtonPressed}
            >
                <View style={styles.rejectIcon}>
                    <MaterialCommunityIcons name="phone-hangup" size={30} color="#efefef" />
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

function mapStoreStateToProps ({ call }) {
    return {
        ...call
    }
  }

export default connect(mapStoreStateToProps, null)(IncomingCallDialog)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    row: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
      },
    acceptIcon: {
        backgroundColor: "green",
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 15
    },
    rejectIcon: {
        backgroundColor: "red",
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 15
    },
})