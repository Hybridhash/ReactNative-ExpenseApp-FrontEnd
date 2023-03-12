
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {useLogin} from '../context/LoginContext';
import {FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import {appLogout} from '../../utilities/http';


export default () => {
  /* - Handle logout from the application
       - Context variable "setIsLoggedIn" is set to false
       - Token data is removed from local storage */


  // Taking setIsLoggedIn from the context to logout from application
  const {setIsLoggedIn} = useLogin();


  // Function for inactive button
  const inactiveButtonPress = () => {
    console.log('Inactive Button');
  };

  // Function to handle the logout from the application
  const logoutPress = () => {
    console.log('Logout');
    appLogout(setIsLoggedIn);
  };


  // Returning the components of add screen
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>Inactive</Text>
        <TouchableOpacity onPress={() => inactiveButtonPress()}>
          <View style={styles.list}>
            <Text style={styles.listText}>
              <FontAwesome5 name="user-edit" size={21} color="white"/>{'  '}
                              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => inactiveButtonPress()}>
          <View style={styles.list}>
            <Text style={styles.listText}>
              <MaterialIcons name="lock" size={24} color="white" />{'  '}
               Change Password
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => inactiveButtonPress()}>
          <View style={styles.list}>
            <Text style={styles.listText}>
              <MaterialIcons name="app-settings-alt" size={24} color="white" />{'  '}
                App Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => inactiveButtonPress()}>
          <View style={styles.list}>
            <Text style={styles.listText}>
              <MaterialIcons name="help" size={24} color="white" />{'  '}
                Help
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.text}>Active</Text>
        <TouchableOpacity onPress={() => logoutPress()}>
          <View style={[styles.list, {backgroundColor: 'red', alignItems: 'center', width: '60%'}]}>
            <Text style={[styles.listText]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};


// Styling for the setting screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8CFD1',
  },
  text: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  list: {
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#4455BB',
  },
  listText: {
    color: '#FFFFFF',
    fontSize: 22,
    padding: 5,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
