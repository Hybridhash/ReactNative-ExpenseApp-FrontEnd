
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
// import { useLogin } from '../../App';
import { useLogin } from '../context/LoginContext';
import AlertMessage from '../components/AlertMessage';
// import { fetchData } from './RecordsTabScreen';


export default () => {

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

    // Taking token to be passed for post requests to  backend
    const {token} = useLogin()
    
    // Function to handle to open and close for alerts
    const handleAlterClose = () => {
        setVisible(false);
      };
  
    // To post data to back end and show error/success alerts (if any)
    const savePress = () => {
        if (selectedDate == null){
          setMessage("Please select the date"),
          setVisible(true)
          return
        }
        
        // Checking `type` variable and changing the amount between positive or negative
        const amount = type === 'expense' ? value * -1 : value;
        console.log('Token value: ', 'Bearer '+token);
        fetch('http://localhost:8000/v1/expense/', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
            
        },
          body: JSON.stringify({
              amount: amount,
              description: desc,
              date:selectedDate,

          })
        })
        .then(response => {
          //Checking the status for the bad response
          if (response.ok == false)
          {response.json()
            .then(data => {
              // Alerting the user on the state of the error encountered from backend
              console.log("Add Transaction Screen:  Error from backend for expense Post and altering user: ", data)
              alert(data.detail)
            })
              .catch(error => {
                console.log(" Error from backend for expense Post: ", error)   
              })
          }
        else if (response.ok)
          {  
            response.json().then(data => {
                // To make the expense/income first letter uppercase
                const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
                // Message to be shown on successful submission to back end
                setMessage(`${desc} successfully added for value of ${data.amount} as ${capitalizedType}`)
                setVisible(true);
                console.log("Add Transaction Screen:  Success from backend for expense Post and altering user: ", data)
                setValue("")
                setDesc("")
            })
          }
        }); 
    };

    // To check the input provided by the user for english only
    const handleDescInput = (text) => {
        // Regular expression to match English letters
        const englishLetters = /^[a-zA-Z\s]*$/;
        if (text.match(englishLetters)) {
            setDesc(text);
        } else {
            setDesc("");
        }
      };
    
    // To check the input provided by the user for digits only
    const handleValueInput = (value) => {
        // Regular expression to match digits
        const digits = /^[+]?[0-9]*$/;
        if (value.match(digits)) {
          setValue(value);
        } else {setValue("")} 
    };

    // To handle transaction type and change button colour for expense and income
    const handleTransactionType = () => {
        setBackgroundColor(backgroundColor === 'green' ? 'red' : 'green');
        setType(type === 'expense' ? 'income' : 'expense');
      };
    
    // To check the input provided by the user for date

    //Returning the components of add screen
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.text}>Enter Value and Expense description</Text>

                <TextInput style={styles.inputBox} 
                placeholder='description'
                placeholderTextColor={'grey'}
                autoCapitalize="none"
                onChangeText={handleDescInput}
                value={desc}/>

                <Text style={[styles.buttonText, {color:'#4455BB'}]}>Click to change expense/income </Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor, borderWidth: 0, paddingBottom:10, paddingTop:10, marginBottom: 20}]}
                    onPress={handleTransactionType}>
                   <Text style={styles.buttonText}>{type}</Text>
                </TouchableOpacity>
              
                <TextInput style={styles.inputBox} 
                placeholder='value'
                placeholderTextColor={'grey'}
                autoCapitalize="none"
                onChangeText={handleValueInput}
                value={value}
                keyboardType="numeric"/>
                
                <View style={styles.calender} >
                    <CalendarPicker  width = {390} 
                    selectedDayColor="#4455BB"  
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={setSelectedDate}
                    />
                </View>

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

    containerCenter: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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

    calender: {
        borderRadius: 20,
        backgroundColor: '#C0C7CE',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        borderWidth: 2,
        borderColor:'#4455BB',
        justifyContent: 'center',
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

    background:{
        backgroundColor:'green',
    },

    buttonText: {
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
