import AsyncStorage from '@react-native-async-storage/async-storage';


const fetchJWT = (username, password, setIsLoggedIn) => {

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
              setIsLoggedIn(true)
              
            })
              // .catch(error => {
              //   console.log(error)   
              // })
          }
        });
      }

// To fetch the transaction data from backend
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

  const insertTransactionHTTP = async (type, value, desc, selectedDate) => {
    // Checking `type` variable and changing the amount between positive or negative
    const amount = type === 'expense' ? value * -1 : value;
    // console.log('Token value: ', 'Bearer '+token);
    
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      const response = await fetch('http://localhost:8000/v1/expense/', {
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
      });
      
      if (!response.ok) {
        const data = await response.json();
        console.log("Backend error :", data);
        return { error: data.detail };
      } else {
        const data = await response.json();

        // To make the expense/income first letter uppercase for better presentation
        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
        
        // Message to be shown on successful submission to backend [FastAPI]
        return { message: `${desc} successfully added for value of ${data.amount} as ${capitalizedType}` };
      }
    } catch (error) {
      console.log("Error from backend for expense Post:", error);
      return { error };
    }
  }

  const appLogout = async (setIsLoggedIn) => {
    // To delete token stored in application database
    await AsyncStorage.removeItem('token');
    // To store the data fetched from back end
    setIsLoggedIn(false);
  }

  export { fetchTransactionsHTTP, insertTransactionHTTP, fetchJWT, fetchData, appLogout };