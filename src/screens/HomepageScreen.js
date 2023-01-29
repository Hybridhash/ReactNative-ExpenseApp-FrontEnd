
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useLogin } from '../../App';



export default function App() {

// Getting the token as it will be passed on each request to the server  
const {token} = useLogin()

console.log(token)

  return (
    <View style={styles.containerCenter}>
    <Text style={styles.whiteText}>HomeScreen test</Text>
    <Text style={styles.whiteText}>{token}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCenter: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
