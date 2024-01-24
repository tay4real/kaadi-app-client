import "react-native-gesture-handler";
import Navigation from "./Navigation";
import { Provider } from "react-redux";
import configureStore from "./store";
import {LogBox} from 'react-native'
import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json'; // <-- Import app theme
import { default as mapping } from './mapping.json'; // <-- Import app mapping



const store = configureStore();

export default function App() {
  LogBox.ignoreAllLogs();
 
  
  return (
   
   <>

   <ApplicationProvider  {...eva}
    theme={{ ...eva.light, ...theme }}
    customMapping={mapping}>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </ApplicationProvider>
   </>
    
  );
}


