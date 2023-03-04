
import { Swipeable } from 'react-native-gesture-handler';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AlertMessage from '../components/AlertMessage';


const Transaction = ({title, amount, id, date}) => {
  
    const rightSwipeActions = () => {
      return (
            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteInnerText}>Delete</Text>
            </TouchableOpacity>
      );
    };
  
    const swipeFromRightOpen = () => {
      alert('Swipe from right' + id);
    };

    // To get the date in a DD/MM/YYY format using built-in constructor function in JavaScript
    const formattedDate = new Date(date).toLocaleDateString('en-GB'); // 'DD/MM/YYY'
  
    return(
      <Swipeable 
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}> 
            <View style={styles.item}>
                 <View style={{  flexDirection: 'row' , justifyContent: 'space-between',}}>
                    <Text style={styles.innerText}>{title}</Text>
                    <Text style={styles.innerText}>{amount}</Text>
                </View>
                <Text style={styles.dateText}> Transaction date: {formattedDate}</Text>
            </View>
      </Swipeable>
    );
  }

  const styles = StyleSheet.create({
    dateText: {
        color:'#D3D3D3',
        fontSize: 14,
        alignSelf:'center',
        fontWeight:'bold',
        marginTop:5
      },

    innerText: {
        color:"#FFFFFF",
        fontSize: 20,
        fontWeight:'bold'
    },

    item: {
        backgroundColor: '#4455BB',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor:"#4455BB",
        borderWidth: 3,
        borderRadius:10,
        justifyContent: 'space-between',
        flexDirection: 'column',
      },

      deleteButton:
      {
        backgroundColor: '#ff8303',
        justifyContent: 'center',
        borderRadius:10,
        paddingHorizontal: 30,
        marginVertical: 6,    
      },
      deleteInnerText:
      {
        color: '#1b1a17',
        fontSize: 20,
        fontWeight: '600',
        fontWeight:'bold',
      },
});

export default Transaction;