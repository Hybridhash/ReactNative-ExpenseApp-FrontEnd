
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {loginImage} from '../../assets';
import {nameValidator, passwordValidator} from '../../utilities/validator';
import {useLogin} from '../context/LoginContext';
import {fetchJWT} from '../../utilities/http';
import AlertMessage from '../components/AlertMessage';


export default function LoginScreen({navigation}) {
// States to hold the user password and email provided by user
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState([]);

  // Context to setIsLoggedIn to "true"
  const {setIsLoggedIn} = useLogin();


  // Navigation to signup screen
  const signupPress = () => {
    navigation.navigate('Registration');
  };

  // Action to perform on pressing the login button
  const loginPress = () => {
    // Validating different inputs provided by the users for login
    const usernameError = nameValidator(username);
    const passwordError = passwordValidator(password);

    // To show all errors encountered during the login process
    const errorDisplay = [];

    if (usernameError || passwordError ) {
      errorDisplay.push(passwordError);
      errorDisplay.push(usernameError);
      // State variable to show modal for errors
      setVisible(true);
      setMessage(errorDisplay);
      return;
    }
    // Calling function in HTTP to setIsLoggedIn to "true"
    fetchJWT(username, password, setIsLoggedIn);
  };

  // Function to handle to open and close for alerts
  const handleAlterClose = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.top}>
        <Image source={loginImage}
          style={{width: '100%', height: '100%', borderRadius: 30}} />
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
      <AlertMessage message={message} visible={visible}
        onClose={handleAlterClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8CFD1',
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
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
    textAlign: 'center',
  },
  top: {
    flex: 0.40,
    borderWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.30,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 20,
  },
  bottom: {
    flex: 0.25,
    borderWidth: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  button: {
    borderColor: '#4455BB',
    borderWidth: 3,
    borderRadius: 70,
    paddingBottom: 5,
    paddingTop: 5,
    width: '35%',
    alignSelf: 'center',
    top: 10,
    right: 0,
    bottom: 0,
    backgroundColor: '#4455BB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
});
