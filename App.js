import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './Screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import Profile from './Screens/Profile';
import HomeScreen from './Screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();


export default function App() {

  const [StoredValue, setStoredValue] = React.useState('false');

  const getValue = async () => {
    try {
      const value = await AsyncStorage.getItem('123');
      value === null || value === false ? setStoredValue(false) : setStoredValue(true);
      console.log('Retrieved value:', StoredValue);
    } catch (error) {
      console.log('Error retrieving value:', StoredValue);
    } 
  }; 

  getValue();


  return (

    <NavigationContainer>
      <Stack.Navigator>
        {StoredValue === false ?  (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        ) : (
          <>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>



    // <NavigationContainer>
    //     <Stack.Navigator>

    //      <Stack.Screen name="Onboarding" component={Onboarding} />
    //      <Stack.Screen name="Profile" component={Profile} />
    //      <Stack.Screen name="Home" component={HomeScreen} />

    //     </Stack.Navigator>
    // </NavigationContainer>

    
  );
}

