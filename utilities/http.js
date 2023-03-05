import { useLogin } from "../App";



// const [transactionData, setTransactionData] = useState([]);



export async function fetchTransactions()
{
    // Taking token to be passed for post requests to  backend
    const {token} = useLogin()

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
          console.log('Data received from backend for expenses: ', data);
        //   setTransactionData(data)
        return data
        })
        .catch(error => {
          console.log('Error while fetching expenses data from backend: ', error);
          alert(error)
        });
}