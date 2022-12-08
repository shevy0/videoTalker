import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ActiveUsersListItem from './ActiveUsersListItem'
import { connect } from 'react-redux';
import { Avatar } from '@rneui/base';
import { getAuth } from '../../firebase';

const ActiveUsersList = (props) => {
  const { activeUsers, callState } = props;

  const auth = getAuth()

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
    color: "black",
    fontSize: 18
  },
})