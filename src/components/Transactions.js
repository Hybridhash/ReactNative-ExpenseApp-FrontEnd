
import {Swipeable} from 'react-native-gesture-handler';
import React, {} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deletePress = (id, callback) => {
  // console.log('deletePress' ,id )
  deleteHTTP(id, (message, action) => {
    callback(message, action);
  });
};

const deleteHTTP = async (id, callback) => {
  // Fetching the JSON Token from server to establish secure connection */
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/v1/delete_transaction/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      // Alerting the user on the state of the error encountered from backend
      console.log(data);
      alert(data.detail);
    } else {
      const data = await response.json();
      console.log(data);
      callback(' is deleted successfully', true);
    }
  } catch (error) {
    console.error(error);
  }
};


const Transaction = ({title, amount, id, date, callback}) => {
  const rightSwipeActions = () => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() =>
        deletePress(id, (message, action)=>
          callback(message, action))}>
        <Text style={styles.deleteInnerText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  // To get  DD/MM/YYY format date using built-in constructor function in JS
  const formattedDate = new Date(date).toLocaleDateString('en-GB');

  return (
    <Swipeable renderRightActions={rightSwipeActions}>
      <View style={styles.item}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.innerText}>{title}</Text>
          <Text style={styles.innerText}>{amount}</Text>
        </View>
        <Text style={styles.dateText}> Transaction date: {formattedDate}</Text>
      </View>
    </Swipeable>

  );
};

const styles = StyleSheet.create({
  dateText: {
    color: '#D3D3D3',
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },

  innerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: '#4455BB',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#4455BB',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  deleteButton:
      {
        backgroundColor: '#ff8303',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: 30,
        marginVertical: 6,
      },
  deleteInnerText:
      {
        color: '#1b1a17',
        fontSize: 20,
        fontWeight: '600',
        fontWeight: 'bold',
      },
});

export default Transaction;
