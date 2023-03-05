import AsyncStorage from '@react-native-async-storage/async-storage';


 

const fetchTransactionsHTTP = async () => {
    let parkedData = []
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');

    await fetch('http://localhost:8000/v1/get_transaction/', {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
      },
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Data received from backend for expenses: ', data);
      parkedData = data
   
    })
    .catch(error => {
      // console.log('Error while fetching expenses data from backend: ', error);
      alert(error)
    });
      console.log('Parked Data: ', parkedData);
    return parkedData
  }

  export { fetchTransactionsHTTP };