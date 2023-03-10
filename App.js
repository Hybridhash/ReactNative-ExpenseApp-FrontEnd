import React, { } from 'react'
import { LoginProvider} from './src/context/LoginContext';
import Navigation from './src/screens/Navigation';



export default function App() {

  
  return (
        <LoginProvider>
            <Navigation/>
        </LoginProvider>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   whiteText: {
//     color:"white",
//     fontSize:30
//     },
//     containerCenter: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//     },
// });
