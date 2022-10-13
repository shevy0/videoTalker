import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ActiveUsersListItem from './ActiveUsersListItem'
import { connect } from 'react-redux';

const ActiveUsersList = (props) => {
  const { activeUsers, callState } = props;

  return (
    <ScrollView>
      <Text style={styles.text}>Aktywni użytkownicy:</Text>  
      {activeUsers.map((activeUser) => <ActiveUsersListItem 
        key={activeUser.socketId} 
        activeUser={activeUser} 
        callState={callState}
        />)}
    </ScrollView>
  )
}

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call
})

export default connect(mapStateToProps)(ActiveUsersList)

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
})