
import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { useLogin } from '../../App';
import AlertMessage from '../components/AlertMessage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Transaction from '../components/Transactions';




const DATA = [
  {
    id:"1",
    title:"Data Structures",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"2",
    title:"STL",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"3",
    title:"C++",
    amount: 32
  },
  {
    id:"4",
    title:"Java",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"5",
    title:"Python",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"6",
    title:"CP",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"7",
    title:"ReactJs",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"8",
    title:"NodeJs",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"9",
    title:"MongoDb",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"10",
    title:"ExpressJs",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"11",
    title:"PHP",
    amount: 25,
    date:"2023-03-04T09:00:00"
  },
  {
    id:"12",
    title:"MySql",
    amount: 20,
    date:"2023-03-04T09:00:00"
  },
];

export default () => {

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

    // Taking token to be passed for post requests to  backend
    const {token} = useLogin()
    
    // Function to handle to open and close for alerts
    const handleAlterClose = () => {
        setVisible(false);
      };
    
    // To post data to back end and show error/success alerts (if any)
    const savePress = () => {
        
        
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

    //Getting date in 'YYYY-MM-DD' format
    const startDate = selectedDate ? selectedDate.format('YYYY-MM-DD').toString() : '';

   
    // To handle transaction type and change button colour for expense and income
    const handleTransactionType = () => {
        setBackgroundColor(backgroundColor === 'green' ? 'red' : 'green');
        setType(type === 'expense' ? 'income' : 'expense');
      };
    
    // Function to create the transaction list based on data fetched from backend
    const renderItem = ({item})=>( 
        <Transaction title={item.title} amount={item.amount} id={item.id} date={item.date}/>
      );

    return (
        <View style={styles.container}>
              <SafeAreaView style={{ marginBottom:tabBarHeight}}>
                  <Text style={styles.text}>Expenses Detail</Text>
                    <FlatList
                      data={DATA}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                    />
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
