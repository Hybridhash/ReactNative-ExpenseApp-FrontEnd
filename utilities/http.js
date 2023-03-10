import AsyncStorage from '@react-native-async-storage/async-storage';


const fetchJWT = (username, password) => {

    //**Step:2 => Fetching the JSON Token from server to establish secure connection */
  
     fetch('http://localhost:8000/v1/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
              username: username,
              password: password
          })
        })
        .then(response => {
          //Checking the status for the bad response
          if (response.ok == false)
          {response.json()
            .then(data => {
              // Alerting the user on the state of the error encountered from backend
              console.log(data)
              alert(data.detail)
            })
              .catch(error => {
                console.log(error)   
              })
          }
        else if (response.ok)
          {
            response.json().then(data => {
  
              // Making the loggedin to true and passing the token data for further use
              // setIsLoggedIn(true)
              // setToken(data.access_token)
              // Store the token using AsyncStorage
              AsyncStorage.setItem('token', data.access_token);
              // Keychain.setGenericPassword(username, data.access_token);
              // const credentials =  Keychain.getGenericPassword();
              // console.log("credentials from keychain", credentials)
              return true
      
              
            })
              // .catch(error => {
              //   console.log(error)   
              // })
          }
        });
      }

const fetchTransactionsHTTP = async () => {
    let parkedData = []
    try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        const response = await fetch('http://localhost:8000/v1/get_transaction/', {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
        });
          if (!response.ok) {
            const data = await response.json();
            // Alerting the user on the state of the error encountered from backend
            console.log(data);
            alert(data.detail);
          } else {
            const data = await response.json();
            console.log(data);
            parkedData = data
          }
    }catch (error) {
      console.error(error);
    }

    return parkedData
  }

  const fetchData = async (setTransactionData,setRefreshStatus ) => {
    const data = await fetchTransactionsHTTP();
    // To store the data fetched from back end
    setTransactionData(data);
    // console.log("Use Effect",data);
    setRefreshStatus(false);
  }

  export { fetchTransactionsHTTP, fetchJWT, fetchData };