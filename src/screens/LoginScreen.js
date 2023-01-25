
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { loginImage } from '../../assets';



export default function LoginScreen({navigation}) {
 
const signupPress = () => {
    navigation.navigate('Registration')
}

const loginPress = () => {
    console.log("login button pressed")

}    

  //States to hold the user password and email  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
    <View style={styles.top}>
        <Image source={loginImage} 
        style={{width: "100%", height: "100%" , borderRadius:30}} />
    </View>
    <View style={styles.middle}>
    <TextInput style={styles.inputBox} 
        placeholder='Username'
        placeholderTextColor={'black'}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        value={email}/>

        <TextInput style={styles.inputBox} 
        placeholder='Password'
        placeholderTextColor={'black'}
        autoCapitalize="none"/>
        <TouchableOpacity onPress={() => loginPress()}>
        <View style={styles.button}>
                <Text style={styles.buttonText}>
                Login
                </Text>
            </View>
        </TouchableOpacity>
        
    </View>
    <View style={styles.bottom}>
    <Text style={styles.text}> Don't have account</Text>
    <TouchableOpacity onPress={() => signupPress()}>
        <View style={styles.button}>
                <Text style={styles.buttonText}>
                Signup
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
