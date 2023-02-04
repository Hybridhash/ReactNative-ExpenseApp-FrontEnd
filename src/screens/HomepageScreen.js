
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useLogin } from '../../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import  AddScreen  from './AddScreen';

const Tab = createBottomTabNavigator();

// function AddScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Add Screen</Text>
//     </View>
//   );
// }

function RecordScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Records Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Settings Screen</Text>
    </View>
  );
}




function HomeTabs() {
  return (
  
  <View style={styles.containerCenter}>
  <Text style={styles.whiteText}>HomeScreen test</Text>
  <Text style={styles.whiteText}>{token}</Text>
  </View>

  );
}

export default function App() {

// Getting the token as it will be passed on each request to the server  
const {token} = useLogin()



console.log(token)

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { position: 'absolute' }, 
    tabBarActiveTintColor: '#e91e63'}} >
      <Tab.Screen name="Add" component={AddScreen} options={{
        tabBarIcon: ({ color}) => (
            <Ionicons name="add-outline" color={color} size={36} />
          ),
        }}/>
      <Tab.Screen name="Records" component={RecordScreen} options={{
        tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="file-cabinet" color={color} size={36} />
          ),
        }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarIcon: ({ color}) => (
            <Ionicons name="settings-outline" color={color} size={36} />
          ),
        }}/>
    </Tab.Navigator>
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
