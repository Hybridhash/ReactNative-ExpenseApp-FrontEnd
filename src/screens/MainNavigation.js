import React, {  } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';
import LoginScreen from './LoginScreen';
import RegistrationScreen from './RegistrationScreen';
import { useLogin } from '../context/LoginContext';

const Stack = createStackNavigator();

export default function Navigation() {

            /*  Main Navigation between Login/Signup screen and to Main
            application once user is authenticated from the backend */

// Use context to check the login status - true or false
const {isLoggedIn} = useLogin()

  return (
    <NavigationContainer>
      {/* Logged in users navigates to Main App via "Tab Navigation"*/}
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={TabNavigation} 
            options={{ title: 'Awesome Expense App' }}/>
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
  