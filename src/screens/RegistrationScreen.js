
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { registrationImage } from '../../assets';
import { emailValidator, nameValidator, passwordValidator, passConfirmValidator, passMatchValidator} from '../../utilities/validator';
import App from './HomepageScreen';
//import axios from 'axios';

export default function RegistrationScreen({navigation}) {

//States to hold the user password and email  
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
 

console.log(name)
const loginPress = () => {
    navigation.navigate('Login')
}

const signupPress = () => {
    console.log("Signup button pressed")

    //Validating the inputs provided by the users on signup page

    const emailError = emailValidator(email)
    const nameError = nameValidator(name)
    const passwordError = passwordValidator(password)
    const passConfirmError = passConfirmValidator(confirmPassword)
    const passMismatchError = passMatchValidator(password, confirmPassword)
    const errorDisplay = []
    //console.log(errorDisplay, nameError)
    
    if (nameError || emailError || passwordError || passConfirmError || passMismatchError) {
      
      errorDisplay.push(passwordError)
      errorDisplay.push(nameError)
      errorDisplay.push(emailError)
      errorDisplay.push(passConfirmError)
      errorDisplay.push(passMismatchError)

      for(let i = 0; i < errorDisplay.length; i++){
        if (errorDisplay[i] !== "")
        alert(errorDisplay[i])
      }
      
      return
    }
        
    



        fetch('http://localhost:8000/v1/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'test4_username',
            email: 'test5_email',
            password: 'test5_password'
        })
    })
        .then(response => console.log(response.status))
        // .then(data => {
        //     // do something with the response
        //     console.log(data)
        //     alert(data.detail)
        //     //console.log('response:', response.status)
        // })
        .catch(error => {
            alert(error)
            
        });


}    

  



  return (
    <View style={styles.container}>
    <View style={styles.top}>
        <Image source={registrationImage} 
        style={{width: "100%", height: "100%" , borderRadius:30}} />
    </View>
    <View style={styles.middle}>
    <TextInput style={styles.inputBox} 
        placeholder='Name'
        placeholderTextColor={'black'}
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
        value={name}/>

    <TextInput style={styles.inputBox} 
        placeholder='Email'
        placeholderTextColor={'black'}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}/>

        <TextInput style={styles.inputBox} 
        placeholder='Password'
        placeholderTextColor={'black'}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        value={password}/>

        <TextInput style={styles.inputBox} 
        placeholder='Confirm Password'
        placeholderTextColor={'black'}
        autoCapitalize="none"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}/>

        <TouchableOpacity onPress={() => signupPress()}>
        <View style={styles.button}>
                <Text style={styles.buttonText}>
                Signup
                </Text>
            </View>
        </TouchableOpacity>
    </View>
    
    <View style={styles.bottom}>
    <Text style={styles.text}> Already have account</Text>
    <TouchableOpacity onPress={() => loginPress()}>
        <View style={styles.button}>
                <Text style={styles.buttonText}>
                Login
                </Text>
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
    flex: 0.45,
    backgroundColor: 'white',
    //borderWidth: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop:20
    
  },
  bottom: {
    flex: 0.10,
    //backgroundColor: 'pink',
    borderWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    //marginTop
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
    //marginTop:0
  },




});
