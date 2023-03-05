
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image,  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { loginImage } from '../../assets';
import { nameValidator, passwordValidator } from '../../utilities/validator';
import { useLogin } from '../../App';
import AlertMessage from '../components/AlertMessage';
import * as Keychain from "react-native-keychain";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {


const {setIsLoggedIn, setToken} = useLogin()

//States to hold the user password and email provided by user 
const [username, setUserName] = useState('')
const [password, setPassword] = useState('')
const [userDetails, setUserDetails] = useState({});

// Action to perform on pressing the signup button
const signupPress = () => {
    navigation.navigate('Registration')
}

const fetchJWT = async (username, password) => {
  //**Step:2 => Fetching the JSON Token from server to establish secure connection */
  
     await fetch('http://localhost:8000/v1/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
              username: username,
              password: password
          })
        })
        .then(response => {
          //Checking the status for the bad response
          if (response.ok == false)
          {response.json()
            .then(data => {
              // Alerting the user on the state of the error encountered from backend
              console.log(data)
              alert(data.detail)
            })
              .catch(error => {
                console.log(error)   
              })
          }
        else if (response.ok)
          {
            response.json().then(data => {
  
              // Making the loggedin to true and passing the token data for further use
              setIsLoggedIn(true)
              setToken(data.access_token)
              // Store the token using AsyncStorage
              AsyncStorage.setItem('token', data.access_token);
              // Keychain.setGenericPassword(username, data.access_token);
              // const credentials =  Keychain.getGenericPassword();
              // console.log("credentials from keychain", credentials)
              
      
              
            })
              // .catch(error => {
              //   console.log(error)   
              // })
          }
        });
      }

// Action to perform on pressing the login button
const loginPress = () => {
    console.log("login button pressed")

    //**Step:1 => Validate the users input before calling the server */

    //Validating different inputs provided by the users for login
    const usernameError = nameValidator(username)
    const passwordError = passwordValidator(password)

    //To show all errors encountered during the signup process
    const errorDisplay = []
    
    if (usernameError || passwordError ) {
      
      errorDisplay.push(passwordError)
      errorDisplay.push(usernameError)

      //Looping over the list of error and displaying it for user to address
      for(let i = 0; i < errorDisplay.length; i++){
        if (errorDisplay[i] !== "")
        alert(errorDisplay[i])
      }
      return
    }

    ///// Calling function to fetch the token
    fetchJWT(username,password)
    
}    

  return (
    <View style={styles.container}>
    
      <View style={styles.top}>
          <Image source={loginImage} 
          style={{width: "100%", height: "100%" , borderRadius:30}} />
      </View>

      <View style={styles.middle}>
          <TextInput style={styles.inputBox} 
            placeholder='Username'
            placeholderTextColor={'grey'}
            autoCapitalize="none"
            onChangeText={(text) => setUserName(text)}
            value={username}/>

          <TextInput secureTextEntry={true} style={styles.inputBox} 
          placeholder='Password'
          placeholderTextColor={'grey'}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          value={password}/>
          
          <TouchableOpacity onPress={() => loginPress()}>
            <View style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
          <Text style={styles.text}> Don't have account</Text>
            <TouchableOpacity onPress={() => signupPress()}>
                <View style={styles.button}>
                        <Text style={styles.buttonText}>Signup</Text>
                </View>
            </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8CFD1',
    //alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    margin:10,
  },

  inputBox: {
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#C0C7CE',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    //paddingLeft: 16,
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center'
   
},

   top: {
    flex: 0.40,
    //backgroundColor: 'grey',
    borderWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.30,
    backgroundColor: 'white',
    //borderWidth: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop:20
  },
  bottom: {
    flex: 0.25,
    //backgroundColor: 'pink',
    borderWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  button: {
    borderColor:"#4455BB",
    borderWidth: 3,
    borderRadius:70,
    paddingBottom: 5,
    paddingTop: 5,
    width: "35%",
    alignSelf:'center', 
    //position:'absolute',
    top:10,
    right: 0,
    bottom:0,
    backgroundColor:'#4455BB',
  },
  buttonText: {
    color:"#FFFFFF",
    fontSize: 20,
    alignSelf:'center',
    fontWeight:'bold'
  },

  text: {
    color:"black",
    fontSize: 20,
    alignSelf:'center',
    fontWeight:'bold',
    marginTop:20
  },
});
