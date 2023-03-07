
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { useLogin } from '../../App';
import AlertMessage from '../components/AlertMessage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Transaction from '../components/Transactions';
import { fetchTransactionsHTTP } from '../../utilities/http';
import * as Keychain from "react-native-keychain";

export default ({navigation}) => {

  const tabBarHeight = useBottomTabBarHeight() + 20;

  console.log(tabBarHeight);

          /*  Inserting a expense data to backend, missing field information is managed 
            from the back end (such as description, data or calender is missing in the 
            data sent to server). However, to get the value in digits and description 
            should be in english */
  
    // States to hold data related to add screen
    const [value, setValue] = useState(0);
    const [desc, setDesc] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('red');
    const [type, setType] = useState('expense')
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("")
    const [isHovered, setIsHovered] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    // const [parkedData, setParkedData] = useState([]);
    const [refreshStatus, setRefreshStatus] = useState(false);

    // Taking token to be passed for post requests to  backend
    const {token} = useLogin()
    
    // Function to handle to open and close for alerts
    const handleAlterClose = () => {
        setVisible(false);
      };

    // const fetchTransactions = async () => {
      
    //     let parkedData = []
    //     await fetch('http://localhost:8000/v1/get_transaction/', {
    //     method: 'GET',
    //     headers: {
    //         'accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer '+token,
    //       },
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       // console.log('Data received from backend for expenses: ', data);
    //       parkedData = data
       
    //     })
    //     .catch(error => {
    //       // console.log('Error while fetching expenses data from backend: ', error);
    //       alert(error)
    //     });
    //       // console.log('Parked Data: ', parkedData);
    //     return parkedData
    //   }

    //Hook to refresh data on deleting the transaction
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchTransactionsHTTP();
        // To store the data fetched from back end
        setTransactionData(data);
        // console.log("Use Effect",data);
        setRefreshStatus(false);
      }
      fetchData();
    }, [refreshStatus]);

    //Hook to refresh the page on tab press from other screens
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
          // Prevent default behavior
          // e.preventDefault();
          // alert('Default behavior prevented');
          setRefreshStatus(true);

        });
    
        return unsubscribe;
      }, [navigation]);
   
    // To handle transaction type and change button colour for expense and income
    const handleTransactionType = () => {
        setBackgroundColor(backgroundColor === 'green' ? 'red' : 'green');
        setType(type === 'expense' ? 'income' : 'expense');
      };
    
    // Function to create the transaction list based on data fetched from backend
    const renderItem = ({item})=>( 
        <Transaction 
          title={item.description} 
          amount={item.amount} 
          id={item.id} 
          date={item.date}    
          callback={(response, action) => {
          setMessage(item.description + response);
          console.log("Transaction:",response)
          console.log("setMessage:",message)
          console.log("setRefreshStatus before state update",refreshStatus)
          setRefreshStatus(action);
          setVisible(true);
          console.log("Transaction",action)
          console.log("setRefreshStatus after state update",refreshStatus)

        }}/>
      );

    return (
        <View style={styles.container}>
              <SafeAreaView style={{ marginBottom:tabBarHeight}}>
                  <Text style={styles.text}>Expenses Detail</Text>
                    <FlatList
                      data={transactionData}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                    />
                  <AlertMessage message={message} visible={visible} onClose={handleAlterClose} /> 
              </SafeAreaView>
        </View>
    );
    
  }


// Styling for the Records Screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B8CFD1',
        marginBottom: 30,
        },
    text: {
        color:"black",
        fontSize: 20,
        alignSelf:'center',
        fontWeight:'bold',
        marginTop:20
      },

 
    innerContainer: {
        borderColor:"#4455BB",
        borderWidth: 3,
        borderRadius:10,
        padding:15,
        width: "90%",
        alignSelf:'center', 
        justifyContent: 'space-between',
        flexDirection: 'row',
        top:10,
        right: 0,
        bottom:0,
        backgroundColor:'#4455BB',
      },

  
    innerContainerText: {
        color:"#FFFFFF",
        fontSize: 20,
        fontWeight:'bold'
    },
});
