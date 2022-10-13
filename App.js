import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CallScreen from './screens/CallScreen';
import { Provider } from 'react-redux';
import store from './store/store'
import { useEffect } from 'react';
import { connectWithSocket } from './utils/wssConnection/wssConnection';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    connectWithSocket();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="CallScreen" component={CallScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
