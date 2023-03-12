import AsyncStorage from '@react-native-async-storage/async-storage';


// Function to push data for new registration of users
const userRegistrationHTTP = async (name, email, password) => {
  const response = await (fetch('http://localhost:8000/v1/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: name,
      email: email,
      password: password,
    }),
  }));

  try {
    if (!response.ok) {
      const data = await response.json();
      console.log('Backend error :', data);
      return {error: data.detail};
    } else {
    // To make the expense/income first letter uppercase for better presentation
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      return {status: `${capitalizedName} has successfully registered`};
    }
  } catch (error) {
    console.log('Registration Backend Error:', error);
    return {error};
  }
};

const fetchJWT = (username, password, setIsLoggedIn) => {
  // Fetching the JSON Token from server to establish secure connection */
  fetch('http://localhost:8000/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
      .then((response) => {
        // Checking the status for the bad response
        if (response.ok == false) {
          response.json()
              .then((data) => {
              // Alerting the user on the state of the error encountered from backend
                console.log(data);
                alert(data.detail);
              })
              .catch((error) => {
                console.log(error);
              });
        } else if (response.ok) {
          response.json().then((data) => {
            // Store the token using AsyncStorage
            AsyncStorage.setItem('token', data.access_token);
            // Setting the "setIsLoggedIn" context variable to true
            setIsLoggedIn(true);
          })
              .catch((error) => {
                console.log(error);
              });
        }
      });
};

// To fetch the transaction data from backend
const fetchTransactionsHTTP = async () => {
  let parkedData = [];
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
      parkedData = data;
    }
  } catch (error) {
    console.error(error);
  }

  return parkedData;
};

// To fetch the  transaction data from backend using async/await
const fetchData = async (setTransactionData, setRefreshStatus ) => {
  const data = await fetchTransactionsHTTP();
  // To store the data fetched from back end
  setTransactionData(data);
  // console.log("Use Effect",data);
  setRefreshStatus(false);
};

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
        date: selectedDate,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.log('Backend error :', data);
      return {error: data.detail};
    } else {
      const data = await response.json();

      // To make the expense/income first letter uppercase for better presentation
      const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

      // Message to be shown on successful submission to backend [FastAPI]
      return {message: `${desc} successfully added for value of ${data.amount} as ${capitalizedType}`};
    }
  } catch (error) {
    console.log('Error from backend for expense Post:', error);
    return {error};
  }
};

// To logout the user from application
const appLogout = async (setIsLoggedIn) => {
  // To delete token stored in application database
  await AsyncStorage.removeItem('token');
  // To store the data fetched from back end
  setIsLoggedIn(false);
};

// Exporting the HTTP based function
export {userRegistrationHTTP, fetchTransactionsHTTP, insertTransactionHTTP, fetchJWT, fetchData, appLogout};
