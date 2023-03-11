
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { registrationImage } from '../../assets';
import { emailValidator, nameValidator, passwordValidator, passConfirmValidator, passMatchValidator} from '../../utilities/validator';
import AlertMessage from '../components/AlertMessage';
import { userRegistrationHTTP } from '../../utilities/http';

export default function RegistrationScreen({navigation}) {

//States to hold the user inputs on signup page  
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [name, setName] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [visible, setVisible] = useState(false);
const [message, setMessage] = useState([]);
const [route, setRoute] = useState(false);
 
const loginPress = () => {
    //Navigate to the login page
    navigation.navigate('Login')
}

const signupPress = async () => {
    
    //** Validate the input provided by users before inserting into database */

    //Validating different inputs provided by the users on signup page
    const emailError = emailValidator(email)
    const nameError = nameValidator(name)
    const passwordError = passwordValidator(password)
    const passConfirmError = passConfirmValidator(confirmPassword)
    const passMismatchError = passMatchValidator(password, confirmPassword)
    
    //Array to show all errors encountered during the signup process
    const errorDisplay = []
    
    if (nameError || emailError || passwordError || passConfirmError || passMismatchError) {
      
      const errors = [nameError, emailError, passwordError, passConfirmError, passMismatchError];
      const errorDisplay = errors.filter(error => error);
      setVisible(true);
      setMessage(errorDisplay)
      return
    }
        
    
    // Getting the response on submitting the user inputs to database and return errors (if any) */
    const result = await userRegistrationHTTP(name,email,password)
    // Handing the responses
    if (result.error) {
      setMessage([result.error]);
      setVisible(true);
    } else if (result.status) {
      setMessage([result.status]);
      setRoute(true);
      setVisible(true);
    }
};


// Function to handle to open and close for alerts
const handleAlterClose = () => {
  // Set Visible to close on clicking the close button on modal
  setVisible(false);
  /*  Since, AlertMessage has dual use, therefore, condition is implemented
      for navigation.*/
  if (route == true){
    setRoute(false);
    navigation &&  navigation.navigate('Login')
  }
};


  return (
    <View style={styles.container}>
    <View style={styles.top}>
        <Image source={registrationImage} 
        style={{width: "100%", height: "100%" , borderRadius:30}} />
    </View>
    <View style={styles.middle}>
    <TextInput style={styles.inputBox} 
        placeholder='Name'
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
        value={name}/>

    <TextInput style={styles.inputBox} 
        placeholder='Email'
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}/>

        <TextInput secureTextEntry={false} style={styles.inputBox} 
        placeholder='Password'
        placeholderTextColor={'grey'}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        value={password}/>

        <TextInput secureTextEntry={false} style={styles.inputBox} 
        placeholder='Confirm Password'
        placeholderTextColor={'grey'}
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

    <AlertMessage message={message} visible={visible} onClose={handleAlterClose} /> 
    </View>
  );
}

// Styling for the registration page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8CFD1',
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
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center'
  },
   top: {
    flex: 0.40,
    borderWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.45,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop:20
  },
  bottom: {
    flex: 0.10,
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
 
  },
});
