
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, TextInput} from 'react-native';
import AlertMessage from '../components/AlertMessage';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Transaction from '../components/Transactions';
import {fetchTransactionsHTTP} from '../../utilities/http';


export default ({navigation}) => {
  /*  - Shows Transactions already recorded in the database
      - Hooks are used to load data on first start and upon
        navigating between tabs
      - The bottom tab bar is used to show the current tab*/


  // States to hold data related to add screen
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [query, setQuery] = useState('');

  // Hook to refresh data on deleting the transaction
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactionsHTTP();
      // To store the data fetched from back end
      setTransactionData(data);
      // console.log("Use Effect",data);
      setRefreshStatus(false);
    };
    fetchData();
  }, [refreshStatus]);

  // Hook to refresh data while navigation between different tabs/screens.
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      // e.preventDefault();
      setRefreshStatus(true);
    });
    return unsubscribe;
  }, [navigation]);

  // Hook to filter the data based on search query
  useEffect(() => {
    if (query === '') {
      // refresh the data on empty string
      setRefreshStatus(true);
    } else {
      const filteredData = transactionData.filter((item) => {
        return item.description.toLowerCase().includes(query.toLowerCase());
      });
      // setting transaction data with query filter
      setTransactionData(filteredData);
    }
  }, [query]);

  // to get the height of the bottom navigation bar
  const tabBarHeight = useBottomTabBarHeight() + 120;

  // Function to create the transaction list based on data fetched from backend
  const renderItem = ({item})=>(
    // Using transaction component to display the items in a list
    <Transaction
      title={item.description}
      amount={item.amount}
      id={item.id}
      date={item.date}
      callback={(response, action) => {
        // To display message on adding a expense or income record
        setMessage([item.description + response]);
        setVisible(true);
        // to refresh the records on adding any new transaction
        setRefreshStatus(action);
      }}/>
  );

  // Function to handle to open and close for alerts
  const handleAlterClose = () => {
    setVisible(false);
  };

  console.log('Query: ', query);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{marginBottom: tabBarHeight}}>
        <Text style={styles.text}>Transactions Detail</Text>
        <TextInput style={styles.inputBox}
          placeholder='search'
          placeholderTextColor={'grey'}
          autoCapitalize="none"
          onChangeText={(text) => setQuery(text)}
          value={query}
        />
        <Text style={[styles.text,{marginTop:0, marginBottom:3, color:'green',}]}>Swipe left to delete</Text>
        <FlatList
          data={transactionData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <AlertMessage message={message} visible={visible} onClose={handleAlterClose} />
      </SafeAreaView>
    </View>
  );
};

// Styling for the Records Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8CFD1',
    marginBottom: 30,
  },
  text: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputBox: {
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#C0C7CE',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#4455BB',
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
  },
});
