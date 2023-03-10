
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, Dimensions} from 'react-native';
import AlertMessage from '../components/AlertMessage';
import { fetchData } from '../../utilities/http';
import { LineChart } from "react-native-chart-kit";

export default ({navigation}) => {

          /*  Fetching data from backend to show total income and expenses incurred since last. 
          Moreover, this screen also shows the transactions incurred during last one week.
          Data is transformed first before showing it to the screen*/
       
    // States to hold data related to add screen
    const [transactionData, setTransactionData] = useState([]);
    const [refreshStatus, setRefreshStatus] = useState(false);

  
    // Fetching the data on first load of tab (Statistic)
    useEffect(() => {
        fetchData(setTransactionData,setRefreshStatus);
      }, []);

    //Hook to refresh data while navigation between different tabs/screens.
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            // Prevent default behavior
            //   e.preventDefault();
            // Fetching data from back end with latest database
            fetchData(setTransactionData,setRefreshStatus)
        });
    
        return unsubscribe;
      }, [navigation]);

    // To get the amount only from dataset and converting it into income and expense for display
    const amounts = transactionData.map(transaction => transaction.amount);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0)
    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)) * -1
    
  
    
    // Getting the transaction for last one week  
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
    const lastWeekTransactions = transactionData.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= oneWeekAgo && transaction.amount < 0; ;
    });

    // Getting only days and amount from the last week transactions
    // Days are sorted showing current day at the last and remaining before it
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const today = new Date().getDay();
    const sortedDays = [...days.slice(today + 1), ...days.slice(0, today + 1)];  
    
    const daysAndAmounts = lastWeekTransactions.reduce((acc, item) => {
        const day = new Date(item.date).getDay();
        if (!acc[day]) {
          acc[day] = { day: days[day], amount: 0 };
        }
        acc[day].amount += item.amount * -1;;
        return acc;
      }, {});
      
    
    const result = sortedDays.map(day => daysAndAmounts[days.indexOf(day)] || { day, amount: 0 });
     

    //Returning the components of add screen
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.text}>Total Expense/Income</Text>
                <View style={styles.rowContainer}>
                    <View style={styles.expenseContainer}>
                        <Text style={[styles.containerText, {color:'#333333'}]}>EXPENSE</Text>
                        <Text style={[styles.containerText, {color:'#333333', marginTop:5}]}>{expense}</Text>
                    </View>
                    <View style={styles.incomeContainer}>
                        <Text style={styles.containerText}>INCOME</Text>
                        <Text style={styles.containerText}>{income}</Text>
                    </View>
                </View>
                <Text style={styles.text}>Last Week Expenses </Text>
                    <LineChart
                        data={{
                        labels: result.map(item => item.day),
                        datasets: [
                            {
                            data: result.map(item => item.amount)
                            }
                        ]
                        }}
                        width={(Dimensions.get("window").width)}  // from react-native
                        height={220}
                        yAxisLabel="$"
                        chartConfig={{
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#4455BB",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 40,
                        alignSelf:"center"
                        
                        }}
                    />
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

    rowContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        height:"30%",

    },    
    
    text: {
        color:'#4455BB',
        fontSize: 20,
        alignSelf:'center',
        fontWeight:'bold',
        marginTop:20
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

    containerText: {
        color:"#FFFFFF",
        fontSize: 20,
        alignSelf:'center',
        fontWeight:'bold'
    },
});
