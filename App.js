import React, { } from 'react'
import { LoginProvider} from './src/context/LoginContext';
import Navigation from './src/screens/MainNavigation';


export default function App() {

  return (
        <LoginProvider>
            <Navigation/>
        </LoginProvider>
  );
}

