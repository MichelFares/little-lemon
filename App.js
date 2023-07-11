import { StyleSheet, Text, View, Image } from 'react-native';
import Onboarding from './Screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Profile from './Screens/Profile';
import HomeScreen from './Screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const LogoTitle = () => (
  <View style={{ flexDirection: 'row' }}>
    <View style={{ flex: 1, alignItems: 'center', marginLeft: 30 }}>
      <Image
        source={require('./assets/Logo.png')}
        style={{ width: 130, height: 40 }}
        resizeMode="contain"
      />
    </View>
    <View style={{ alignSelf: 'flex-start', marginRight: 10, }}>
      <Image
        source={require('./assets/Profile.png')}
        style={{ width: 70, height: 40 }}
        resizeMode="contain"
      />
    </View>
  </View>
);


export default function App() {

  const [StoredValue, setStoredValue] = React.useState('false');

  useEffect(() => {

   const getValue = async () => {
     try {
       const value = await AsyncStorage.getItem('123');
       value === null || value === 'false' ? setStoredValue('false') : setStoredValue('true');
       console.log('Retrieved value:', StoredValue);
     } catch (error) {
       console.log('Error retrieving value:', StoredValue);
     } 
   }; 

   getValue();

  }, []);


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={StoredValue === 'false' ? "Onboarding" : "Profile"}>
        {StoredValue === 'false' ?  (
          <>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          
          </>
          
        ) : (
          <>
            <Stack.Screen name="Profile" component={Profile} options={
              {headerTitle: () => <LogoTitle/>,
               headerLeft: null,
               headerStyle: {height: 60},
               headerTitleAlign: 'center',
              }}

               
            />

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

