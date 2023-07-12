import { StyleSheet, Text, View, Image } from 'react-native';
import Onboarding from './Screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import Profile from './Screens/Profile';
import HomeScreen from './Screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Stack = createNativeStackNavigator();

// const LogoTitle = () => (
//   <View style={{ flexDirection: 'row' }}>
//     <View style={{ flex: 1, alignItems: 'center', marginLeft: 30 }}>
//       <Image
//         source={require('./assets/Logo.png')}
//         style={{ width: 130, height: 40 }}
//         resizeMode="contain"
//       />
//     </View>
//     <View style={{ alignSelf: 'flex-start', marginRight: 10, }}>
//       <Image
//         source={{ uri: image }}
//         style={{ width: 70, height: 40 }}
//         resizeMode="contain"
//       />
//     </View>
//   </View>
// );


export default function App() {

  const [onboardValue, setonboardValue] = useState('false');
  const [image, setImage] = useState(null);

  const LogoTitle = () => (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1, alignItems: 'center', marginLeft: 35 }}>
        <Image
          source={require('./assets/Logo.png')}
          style={{ width: 130, height: 40 }}
          resizeMode="contain"
        />
      </View>
      <View style={{ alignSelf: 'flex-start', marginRight: 25, }}>
        <Image
          source={{ uri: image }}
          style={{ width: 40, height: 40, borderRadius: 100, }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
  

  useEffect(() => {

   const getonboardValue = async () => {
     try {
       const value = await AsyncStorage.getItem('onboard');
       value === 'true' ? setonboardValue('true') : setonboardValue('false');
       const retrievedImage = await AsyncStorage.getItem('image');
       if (retrievedImage !== null) {
        setImage(JSON.parse(retrievedImage));
      }
       console.log('Retrieved value:', onboardValue);
     } catch (error) {
       console.log('Error retrieving value:', onboardValue);
     } 
   }; 

   getonboardValue();

   LogoTitle;


  }, []);

   


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={onboardValue === 'false' ? "Onboarding" : "Profile"}>
        {onboardValue === 'false' ?  (
          <>
          {/* <Stack.Screen name="Profile" component={Profile} /> */}
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
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

