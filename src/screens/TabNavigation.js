
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, Octicons  } from '@expo/vector-icons';
import  AddScreen  from './AddScreen';
import RecordScreen from './RecordScreen';
import StatisticTabScreen from './StatisticTabScreen';
import SettingsTabScreen from './SettingsTabScreen';


const Tab = createBottomTabNavigator();


export default function App() {

          /* This is used for Navigation between different tabs once user is 
          authenticated from backend. There are four tabs in application.*/

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { position: 'absolute' }, 
    tabBarActiveTintColor: '#e91e63'}} >
      {/* Add Transaction - To add new transaction */}
      <Tab.Screen name="Add" component={AddScreen} 
        options={{
          tabBarIcon: ({ color}) => (
              <Ionicons name="add-outline" color={color} size={36} />
            ),
          }}
      />
      {/* Records - Shows record from backend */}
      <Tab.Screen name="Records" component={RecordScreen} 
        options={{
          tabBarIcon: ({ color}) => (
              <MaterialCommunityIcons name="file-cabinet" color={color} size={36} />
            ),
          }}
      />
      {/* Statistic - Shows stats related to transaction records*/}
      <Tab.Screen name="Statistic" component={StatisticTabScreen} 
      options={{
        tabBarIcon: ({ color}) => (
            <Octicons name="graph" color={color} size={32} />
          ),
        }}/>
      {/* Settings - To change the profile and logout*/}
      <Tab.Screen name="Settings" component={SettingsTabScreen} 
        options={{
          tabBarIcon: ({ color}) => (
              <Ionicons name="settings-outline" color={color} size={36} />
            ),
          }}
      />
    </Tab.Navigator>
  );
}
