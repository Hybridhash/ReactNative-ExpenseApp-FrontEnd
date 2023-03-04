
import { Swipeable } from 'react-native-gesture-handler';
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AlertMessage from '../components/AlertMessage';

const Transaction = ({title, amount, id}) => {
  
    const rightSwipeActions = () => {
      return (
            <TouchableOpacity
            style={{
                backgroundColor: '#ff8303',
                justifyContent: 'center',
                borderRadius:10,
                paddingHorizontal: 30,
                marginVertical: 6,         
            }}
            >
                <Text
                    style={{
                    color: '#1b1a17',
                    fontSize: 20,
                    fontWeight: '600',
                    fontWeight:'bold',
                    }}
                >
                    Delete
                </Text>
            </TouchableOpacity>
      );
    };
  
    const swipeFromRightOpen = () => {
      alert('Swipe from right' + id);
    };
  
    return(
      <Swipeable 
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}> 
        
            <View style={styles.item}>
                <Text style={styles.innerText}>{title}</Text>
                <Text style={styles.innerText}>{amount}</Text>
            </View>
      </Swipeable>
    );
  }

  const styles = StyleSheet.create({

    innerText: {
        color:"#FFFFFF",
        fontSize: 20,
        fontWeight:'bold'
    },

    item: {
        backgroundColor: '#4455BB',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderColor:"#4455BB",
        borderWidth: 3,
        borderRadius:10,
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

});

export default Transaction;