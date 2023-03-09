
import React, { useState } from 'react'
import { StyleSheet, Text, View , Dimensions } from 'react-native';
// import { useLogin } from '../../App';
import { useLogin } from '../context/LoginContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, Octicons  } from '@expo/vector-icons';
import  AddScreen  from './AddScreen';
import RecordScreen from './RecordScreen';
import StatisticScreen from './StatisticScreen';
import { LineChart } from "react-native-chart-kit";


const Tab = createBottomTabNavigator();


function TestScreen({route, navigation}) {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      // e.preventDefault();
      alert('Default behavior prevented');
      // setVisible(true);
      // console.log(e);
      // console.log("Setting Screen",visible)
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);


  const chartConfig = {
    // color: (opacity = 1) => `rgba(100, 100, 255, ${opacity})`,
    fillShadowGradient: "blue",
    fillShadowGradientOpacity: 1,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const { param } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Settings Screen</Text>
    <Text>{param}</Text>

    <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    // yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      // backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#4455BB",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 40
    }}
  />
</View>


    </View>
    
    
  );
}


export default function App() {

// Getting the token as it will be passed on each request to the server  
const {token} = useLogin()



console.log("HomepageScreeen: Token saved upon logging into application and getting the same using const {token} = useLogin():",token)

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { position: 'absolute' }, 
    tabBarActiveTintColor: '#e91e63'}} >
      <Tab.Screen name="Add" component={AddScreen} options={{
        tabBarIcon: ({ color}) => (
            <Ionicons name="add-outline" color={color} size={36} />
          ),
        }}/>
      <Tab.Screen name="Records" component={RecordScreen} options={{
        tabBarIcon: ({ color}) => (
            <MaterialCommunityIcons name="file-cabinet" color={color} size={36} />
          ),
        }}/>
      <Tab.Screen name="Statistic" component={StatisticScreen} initialParams={{ param: 'Hello World' }} options={{
        tabBarIcon: ({ color}) => (
            <Octicons name="graph" color={color} size={32} />
          ),
        }}/>
      <Tab.Screen name="Settings" component={TestScreen} initialParams={{ param: 'Hello World' }} options={{
        tabBarIcon: ({ color}) => (
            <Ionicons name="settings-outline" color={color} size={36} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCenter: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
});
