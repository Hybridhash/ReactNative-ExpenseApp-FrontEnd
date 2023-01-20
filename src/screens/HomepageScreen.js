
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';




export default function App() {

  //States to hold the user status for navigation
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (
    <View style={styles.containerCenter}>
    <Text style={styles.whiteText}>HomeScreen</Text>
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
