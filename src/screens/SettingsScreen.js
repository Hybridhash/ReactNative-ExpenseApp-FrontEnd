
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useLogin } from '../../App';
import AlertMessage from '../components/AlertMessage';
// import { fetchData } from './RecordScreen';
import { fetchData } from '../../utilities/http';

export default ({navigation}) => {

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
    const [transactionData, setTransactionData] = useState([]);
    const [refreshStatus, setRefreshStatus] = useState(false);


    // // Taking token to be passed for post requests to  backend
    // const {token} = useLogin()

    //Hook to refresh data while navigation between different tabs/screens.
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
          // Prevent default behavior
        //   e.preventDefault();
          alert('Default behavior prevented');
          setVisible(true);
          // console.log(e);
          console.log("Setting Screen",visible)
          // Fetching data from back end with latest database
          fetchData(setTransactionData,setRefreshStatus)
        });
    
        return unsubscribe;
      }, [navigation]);

    const amounts = transactionData.map(transaction => transaction.amount);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)) * -1
    
    // console.log("Income",expense)

    // Function to handle to open and close for alerts
    const handleAlterClose = () => {
        setVisible(false);
      };
  
    // To post data to back end and show error/success alerts (if any)
    const savePress = () => {
        
       
    };

    //Getting date in 'YYYY-MM-DD' format
    const startDate = selectedDate ? selectedDate.format('YYYY-MM-DD').toString() : '';
    

    //Returning the components of add screen
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.text}>Statistics</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.expenseContainer}>
                        <Text style={[styles.containerText, {color:'#333333'}]}>EXPENSE</Text>
                        <Text style={[styles.containerText, {color:'#333333', marginTop:5}]}>{expense}</Text>
                    </View>
                    <View style={styles.incomeContainer}>
                        <Text style={[styles.containerText]}>INCOME</Text>
                        <Text style={[styles.containerText]}>{income}</Text>
                    </View>
                </View>

                <Text style={[styles.buttonText, {color:'#4455BB'}]}>Click to change expense/income </Text>

              

                <TouchableOpacity onPress={() => savePress()}>
                    <View style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>

                <AlertMessage message={message} visible={visible} onClose={handleAlterClose} />
                
            </SafeAreaView>
        </View>
        

    );
  }


// Styling for the add screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B8CFD1',
        },

    // containerCenter: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     },
    rowContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        height:"40%",
        // backgroundColor: '#fff',
    },    
    

    text: {
        color:"black",
        fontSize: 20,
        alignSelf:'center',
        fontWeight:'bold',
        marginTop:20
      },

    inputBox: {
        height: 50,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#C0C7CE',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 30,
        marginRight: 30,
        borderWidth: 2,
        borderColor:'#4455BB',
        fontSize: 22,
        fontWeight: '400',
        textAlign: 'center' 
    },

    button: {
        borderColor:"#4455BB",
        borderWidth: 3,
        borderRadius:70,
        paddingBottom: 5,
        paddingTop: 5,
        width: "35%",
        alignSelf:'center', 
        top:10,
        right: 0,
        bottom:0,
        backgroundColor:'#4455BB',
      },
    
    incomeContainer: {
        borderColor:"#2E8B57",
        borderWidth: 3,
        borderRadius:20,
        padding:10,
        margin:10,
        width: "35%",
        height: "60%",
        alignSelf:'center', 
        backgroundColor:"#2E8B57",
        justifyContent: 'center',
      },

        expenseContainer: {
            borderColor:"#FA8072",
            borderWidth: 3,
            borderRadius:20,
            padding:10,
            margin:10,
            width: "35%",
            height: "60%",
            alignSelf:'center', 
            backgroundColor:"#FA8072",
            justifyContent: 'center',
        },




    background:{
        backgroundColor:'green',
    },

    containerText: {
        color:"#FFFFFF",
        fontSize: 20,
        alignSelf:'center',
        fontWeight:'bold'
    },

    

    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnNormal: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        height: 30,
        width: 100,
      },
      btnPress: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        height: 30,
        width: 100,
      }
});
