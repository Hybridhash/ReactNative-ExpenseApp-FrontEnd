
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AlertMessage from '../components/AlertMessage';
import {insertTransactionHTTP} from '../../utilities/http';


export default () => {
  /*  - Inserting a expense data to backend, missing field apart
        from calender is managed from the back end (such as description and amount).
      - Custom Message modal is used to showing the response on successful/failed attempt
      - Custom functions are provided to ensure description should be in english and
        amount should be in digits (round to zero) */

  // States to hold data related to add screen
  const [value, setValue] = useState(0);
  const [desc, setDesc] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('red');
  const [type, setType] = useState('expense');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState([]);


  // To post data to back end and show error/success alerts (if any)
  const savePress = async () => {
    // Checks that calender input is null
    if (selectedDate == null) {
      setMessage(['Please select the date']),
      setVisible(true);
      return;
    }
    // Get the result from back end -  success/failure
    const result = await insertTransactionHTTP( type, value, desc, selectedDate);

    // Handing the responses
    if (result.error) {
      setMessage([result.error]);
      setVisible(true);
    } else if (result.message) {
      setMessage([result.message]);
      setVisible(true);
      setValue('');
      setDesc('');
    }
  };

  // Function to check the input provided by the user for english only
  const handleDescInput = (text) => {
    // Regular expression to match English letters
    const englishLetters = /^[a-zA-Z][a-zA-Z\s]*$/;
    if (text.match(englishLetters)) {
      setDesc(text);
    } else {
      setDesc('');
    }
  };

  // Function to check the input provided by the user for digits only
  const handleValueInput = (value) => {
    // Regular expression to match digits
    const digits = /^[+]?[0-9]*$/;
    if (value.match(digits)) {
      setValue(value);
    } else {
      setValue('');
    }
  };

  // Function to handle transaction type and change button colour for expense and income
  const handleTransactionType = () => {
    setBackgroundColor(backgroundColor === 'green' ? 'red' : 'green');
    setType(type === 'expense' ? 'income' : 'expense');
  };

  // Function to handle to open and close for alerts
  const handleAlterClose = () => {
    setVisible(false);
  };

  // To check the input provided by the user for date

  // Returning the components of add screen
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

        <Text style={[styles.buttonText, {color: '#4455BB'}]}>Click to change expense/income </Text>

        <TouchableOpacity
          style={[styles.button, {backgroundColor, borderWidth: 0, paddingBottom: 10, paddingTop: 10, marginBottom: 20}]}
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
          <CalendarPicker width = {390}
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
};


// Styling for the add transactions screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8CFD1',
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
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#4455BB',
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
  },

  calender: {
    borderRadius: 20,
    backgroundColor: '#C0C7CE',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 2,
    borderColor: '#4455BB',
    justifyContent: 'center',
  },

  button: {
    borderColor: '#4455BB',
    borderWidth: 3,
    borderRadius: 70,
    paddingBottom: 5,
    paddingTop: 5,
    width: '35%',
    alignSelf: 'center',
    top: 10,
    right: 0,
    bottom: 0,
    backgroundColor: '#4455BB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
