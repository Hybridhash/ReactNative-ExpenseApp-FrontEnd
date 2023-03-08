import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, HomepageScreen, RegistrationScreen } from './src/screens'


const Stack = createStackNavigator();
const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext)

export default function App() {

  //let childRef = useRef(null);

  

  const HomepageScreen1 = () => {
    return (
      <View style={styles.containerCenter}>
      <Text style={styles.whiteText}>HomePage</Text>
      </View>
    )
  }

  

  //States to hold the user status for navigation and passing the data
  const [token, setToken] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const credentials = await AsyncStorage.getItem('token');
  //       if (credentials) {
  //         setIsLoggedIn(true);
  //         // setUserDetails(credentials);
  //       } else {
  //         console.log("No credentials stored");
  //       }
  //     } catch (error) {
  //       console.log("Keychain couldn't be accessed!", error);
  //     }
  //   })();
  // }, []);
  
  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, token, setToken}}>
          <NavigationContainer>
                  <Stack.Navigator >
                    {
                      isLoggedIn ? (<Stack.Screen name="Home" component={HomepageScreen} options={{title: 'Awesome Expense App'}}
                      />)
                      : 
                      (
                        <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Registration" component={RegistrationScreen}/>
                        </>
                      )
                    } 
                  </Stack.Navigator> 
          </NavigationContainer>
        </LoginContext.Provider>
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
