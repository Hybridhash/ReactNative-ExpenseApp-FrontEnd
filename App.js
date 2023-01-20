import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomepageScreen, RegistrationScreen } from './src/screens'

const Stack = createStackNavigator();

export default function App() {

  const HomepageScreen1 = () => {
    return (
      <View style={styles.containerCenter}>
      <Text style={styles.whiteText}>HomePage</Text>
      </View>
    )
  }

  //States to hold the user status for navigation
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          user ? (<Stack.Screen name="Home" component={HomepageScreen}/>) : 
          (
            <>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registration" component={RegistrationScreen}/>
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color:"white",
    fontSize:30
    },
    containerCenter: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
