import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CallScreen from './screens/CallScreen';
import SignupScreen from './screens/SignupScreen';
import { Provider } from 'react-redux';
import store from './store/store'
import { useEffect, useState } from 'react';
import { connectWithSocket } from './utils/wssConnection/wssConnection';
import { firebase } from './config';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c68ed' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    connectWithSocket();
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (user) {
    return (
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="CallScreen"
          component={CallScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
        />
      </Stack.Navigator>
    )
  }
  else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    )
  }
}
export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
