import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Onboarding from './Screens/Onboarding';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import Profile from './Screens/Profile';
import HomeScreen from './Screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [onboardValue, setOnboardValue] = useState('false');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getOnboardValue = async () => {
      try {
        const value = await AsyncStorage.getItem('onboard');
        setOnboardValue(value === 'true' ? 'true' : 'false');
        const retrievedImage = await AsyncStorage.getItem('image');
        if (retrievedImage !== null) {
          setImage(JSON.parse(retrievedImage));
        }
        console.log('Retrieved value:', onboardValue);
      } catch (error) {
        console.log('Error retrieving value:', onboardValue);
      }
    };

    getOnboardValue();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={onboardValue === 'false' ? 'Onboarding' : 'Home'}>
        {onboardValue === 'false' ? (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                headerTitle: () => <LogoTitle navigation={navigation} image={image} />,
                headerLeft: null,
                headerStyle: { height: 60 },
                headerTitleAlign: 'center',
              })}
            />

            <Stack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation }) => ({
                headerTitle: () => <LogoTitle navigation={navigation} image={image} />,
                headerLeft: null,
                headerStyle: { height: 60 },
                headerTitleAlign: 'center',
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LogoTitle = ({ navigation, image }) => {
  const onPressHandler = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={{ flexDirection: 'row'}}>
      <View style={{ alignItems: 'center', marginLeft:100, marginRight: 20}}>
        <Image
          source={require('./assets/Logo.png')}
          style={{ width: 130, height: 40 }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={{alignItems: 'flex-end', marginLeft:100}}>
          <Image
            source={{ uri: image }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
