import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, Pressable, Alert, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Onboarding = ({navigation}) => {



    const [fName, setfName] = useState('');
    const [email, setEmail] = useState('');
    const [onboard, setonboard] = useState('false');

    const saveOnboard = async () => {
      try {
        await AsyncStorage.setItem('onboard', onboard);
        console.log(onboard + '     onboard saved successfully.');
      } catch (error) {
        console.log('Error saving value:', error);
      }
    };

    const saveFirstName = async () => {
      try {
        await AsyncStorage.setItem('firstName', fName);
        console.log('First Name saved successfully.');
      } catch (error) {
        console.log('Error saving First Name:', error);
      }
    };

    const saveEmail = async () => {
      try {
        await AsyncStorage.setItem('email', email);
        console.log('Email saved successfully.');
      } catch (error) {
        console.log('Error saving Email:', error);
      }
    };


  return (

 
   
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/littleLemonHeader.png")}
      />
      <ScrollView style={styles.Innercontainer}
      keyboardDismissMode="on-drag">
       <Text style={styles.title}>
         Let us get to know you
       </Text>

       <Text style={styles.text}>
         First Name
       </Text>

       <TextInput
         style={styles.input}
         value={fName}
         onChangeText={setfName}
         placeholder={"First Name"}
         clearButtonMode = "always"

         
       />

       <Text style={styles.text}>
         Email
       </Text>

       <TextInput
         style={styles.input}
         value={email}
         onChangeText={setEmail}
         keyboardType="email-address"
         textContentType="emailAddress"
         placeholder={"Type your email"}
         clearButtonMode = "always"
       />

      </ScrollView>

      <Pressable onPress={() => {
        if (!fName || !email || fName.length <3 || email.length <8 ) {
          Alert.alert("Invalid FirstName or Email");
          setonboard('false')
          saveOnboard();
          
        }
        else{
         setonboard('true');
         saveOnboard();
         saveFirstName();
         saveEmail();
         navigation.replace('Profile');
  
       }
       }}
       style={styles.presssCont}>
        <Text style={styles.buttonText}>
          Next
        </Text>


      </Pressable>
      
    </View>

  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: '10%',
    backgroundColor: "#EDEFEE",
  },

  Innercontainer: {
    flex: 0.6,
    backgroundColor: "#AAAAAA",
  },

  presssCont: {
    flex: 0.4,
    backgroundColor: "#EDEFEE",
  },


  title: {
    color: "#333333",
    textAlign: "center",
    fontSize: 25,
    marginTop: '13%',
    marginBottom: '8%',
    fontWeight: 'bold',
  },

  text: {
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
    marginTop: '8%',
  },


  logo: {
    height: "12%",
    width: '100%',
    resizeMode: "contain",
    backgroundColor: "#EDEFEE",
    marginVertical: 5,
  },
  
  input: {
    height: 40,
    marginVertical: '3%',
    borderRadius: 8,
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    borderColor: "black",
    marginHorizontal: '10%',
  },

  buttonText: {
    marginTop: '15%',
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
    borderWidth: 2,
    borderRadius: 15,
    padding: 5,
    marginLeft: '55%',
    marginRight: '8%',
    borderColor: '#AAAAAA',
    backgroundColor: '#AAAAAA',
  },

});

export default Onboarding;
