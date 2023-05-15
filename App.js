import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, SafeAreaView, ImageBackground} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/screens/HomeScreen.js';
import SignupScreen from './app/screens/Signupscreen/Signupscreen.js';
import SingScreen from './app/screens/SingScreen/SingScreen.js';
import MapScreen from './app/screens/MapScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      {
      <Stack.Navigator>
        <Stack.Screen name="main" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={SingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
      }
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%",
  },

  login:{
    backgroundColor:"transparent",
    width: "70%",
    height:"50%",
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    elevation: 4, // Add elevation for Android shadow
    alignItems: 'center',
    justifyContent: 'center',
  }
});
