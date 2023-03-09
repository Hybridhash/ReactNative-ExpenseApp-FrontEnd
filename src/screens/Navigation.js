import React, { createContext, useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomepageScreen from './HomepageScreen';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import { useLogin } from '../context/LoginContext';

const Stack = createStackNavigator();

export default function Navigation() {
// const [isLoggedIn, setIsLoggedIn] = useState(false)
const {isLoggedIn, setIsLoggedIn, setToken} = useLogin()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={HomepageScreen}
            options={{ title: 'Awesome Expense App' }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
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
  