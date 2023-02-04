
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useLogin } from '../../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';


export default () => {

    const [value, setValue] = useState();
    const [desc, setDesc] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    
    const savePress = () => {
        console.log("save pressed");
    };

    const startDate = selectedDate ? selectedDate.format('YYYY-MM-DD').toString() : '';

    const handleChange = (text) => {
        // Regular expression to match digits
        const digits = /^\d+$/;
        if (text.match(digits)) {
          setValue(text);
        } else {setValue("")}
        
    };

    //Returning a Row 
    return (
        
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.text}>Enter Value and Expense description</Text>

                <TextInput style={styles.inputBox} 
                placeholder='description'
                placeholderTextColor={'grey'}
                autoCapitalize="none"
                onChangeText={(text) => setDesc(text)}
                value={desc}/>

                <TextInput style={styles.inputBox} 
                placeholder='value'
                placeholderTextColor={'grey'}
                autoCapitalize="none"
                onChangeText={handleChange}
                value={value}
                keyboardType="numeric"/>
                
                <View style={styles.calender} >
                    <CalendarPicker  width = {390} 
                    selectedDayColor="#4455BB"  
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={setSelectedDate}/>
                </View>

                <TouchableOpacity onPress={() => savePress()}>
                    <View style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
        

    );
  }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B8CFD1',
        //alignItems: 'center',
        //justifyContent: 'center',
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
        //paddingLeft: 16,
        borderWidth: 2,
        borderColor:'#4455BB',
        fontSize: 22,
        fontWeight: '400',
        textAlign: 'center' 
    },

    calender: {
        // height: 50,
        borderRadius: 20,
        // overflow: 'hidden',
        backgroundColor: '#C0C7CE',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        //paddingLeft: 16,
        //alignItems: 'center',
        borderWidth: 2,
        borderColor:'#4455BB',
        justifyContent: 'center',
        // fontSize: 22,
        // fontWeight: '400',
        // textAlign: 'center'
       
    },

    button: {
        borderColor:"#4455BB",
        borderWidth: 3,
        borderRadius:70,
        paddingBottom: 5,
        paddingTop: 5,
        width: "35%",
        alignSelf:'center', 
        //position:'absolute',
        top:10,
        right: 0,
        bottom:0,
        backgroundColor:'#4455BB',
      },

    buttonText: {
        color:"#FFFFFF",
        fontSize: 20,
        alignSelf:'center',
        fontWeight:'bold'
    },
});
