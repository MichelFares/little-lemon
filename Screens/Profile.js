import { useState,useEffect } from 'react';
import { View, Image, StyleSheet, Text, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


const Profile = ({navigation}) => {

  const [initialState, setInitialState] = useState({
    image: null,
    firstName: '',
    lastName: '',
    PhoneNumber: '',
    email: '',
  });

  const [firstName, setFirstName] = useState(initialState.firstName);
  const [lastName, setlastName] = useState(initialState.lastName);
  const [email, setemail] = useState(initialState.email);
  const [PhoneNumber, setPhoneNumber] = useState(initialState.PhoneNumber);
  const [image, setImage] = useState(initialState.image);

  // const [firstName, setFirstName] = useState('');
  // const [lastName, setlastName] = useState('');
  // const [email, setemail] = useState('');
  // const [PhoneNumber, setPhoneNumber] = useState('');
  // const [image, setImage] = useState(null);

  useEffect(() => {

    retrieveData();
    // const getFirstName = async () => {
    //   try {
    //     const storedFirstName = await AsyncStorage.getItem('firstName');
    //     if (storedFirstName !== null) {
    //       setFirstName(storedFirstName);
          
    //     }
    //   } catch (error) {
    //     console.log('Error retrieving First Name:', error);
    //   }
    // };

    // const getEmail = async () => {
    //   try {
    //     const storedEmail = await AsyncStorage.getItem('email');
    //     if (storedEmail !== null) {
    //       setemail(storedEmail);
    //     }
    //   } catch (error) {
    //     console.log('Error retrieving Email:', error);
    //   }
    // };

    // getFirstName();
    // getEmail();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const saveData = async () => {
    if(firstName === '' || lastName === '' || email === '' || PhoneNumber === ''){
      Alert.alert ('WARNING...', 'Please fill in all required input fields to save !')
    }
    else{
    try {
      await AsyncStorage.setItem('firstname', firstName);
      await AsyncStorage.setItem('lastname', lastName);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('PhoneNumber', PhoneNumber);
      await AsyncStorage.setItem('image', JSON.stringify(image));

      Alert.alert ('Saved Successfully', 'All new input data are saved successfully !')
      console.log('Data saved successfully!');
    } catch (error) {
      console.log('Error saving data: ', error);
    }
  }
  }; 

  const retrieveData = async () => {
    try {
      const retrievedFirstname = await AsyncStorage.getItem('firstname');
      const retrievedLastname = await AsyncStorage.getItem('lastname');
      const retrievedEmail = await AsyncStorage.getItem('email');
      const retrievedPhoneNumber = await AsyncStorage.getItem('PhoneNumber');
      const retrievedImage = await AsyncStorage.getItem('image');

      if (retrievedFirstname !== null) {
        setFirstName(retrievedFirstname);
      }

      if (retrievedLastname !== null) {
        setlastName(retrievedLastname);
      }

      if (retrievedImage !== null) {
        setImage(JSON.parse(retrievedImage));
      }

      if (retrievedEmail !== null) {
        setemail(retrievedEmail);
      }

      if (retrievedPhoneNumber !== null) {
        setPhoneNumber(retrievedPhoneNumber);
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };

  const discardChanges = () => {
    setImage(initialState.image);
    setFirstName(initialState.firstName);
    setlastName(initialState.lastName);
    setemail(initialState.email);
    setPhoneNumber(initialState.PhoneNumber);
  };

  
  return (

    <ScrollView style = {styles.container}>

      <View style = {styles.Innercontainer1}>
        <Text style = {styles.textBlock}>
          Personal information
        </Text>
      </View>

      <View style = {styles.Innercontainer2}>
        

        {image ? 
        <Image source={{ uri: image }} style={styles.ProfilePic} /> 
        : 
        (<View style={styles.placeholder}>
          <Text style={styles.placeholderText}>{firstName.charAt(0)}{lastName.charAt(0)}</Text> 
        </View>)}

        <Pressable onPress={pickImage}>
          <Text style ={styles.buttonText1}>
            Change
          </Text>
        </Pressable>

        <Pressable onPress={removeImage}>
         <Text style ={styles.buttonText2}>
          Remove
         </Text>
        </Pressable>
      </View>

      <View style ={styles.Innercontainer3}>

        <Text style ={styles.textinputheader}>
          First Name
        </Text>
        <TextInput 
        style ={styles.input} 
        value={firstName}
        placeholder='FirstName'
        onChangeText={setFirstName}/>
        

        <Text style ={styles.textinputheader}>
          Last Name
        </Text>
        <TextInput 
        style ={styles.input} 
        value={lastName}
        placeholder='Last Name'
        onChangeText={setlastName}/>

        <Text style ={styles.textinputheader} >
          Email
        </Text>
        <TextInput 
        style ={styles.input} 
        value={email}
        placeholder='Email'
        onChangeText={setemail}
        keyboardType='email-address'/>

        <Text style ={styles.textinputheader}>
          Phone Number
        </Text>
        <TextInput 
        style ={styles.input} 
        value={PhoneNumber}
        placeholder='Phone Number'
        onChangeText={setPhoneNumber}
        keyboardType='phone-pad'/>

      </View>

      <View>

       <Text style ={styles.textBlock}>
          Email notifications
       </Text>

       <CheckBox
        containerStyle ={styles.CheckBoxContainer}
        textStyle={styles.CheckBoxtext}
        title="Order Statuses"
       />
       <CheckBox
        containerStyle ={styles.CheckBoxContainer}
        textStyle={styles.CheckBoxtext}
        title="Password changes"
       />
       <CheckBox
        containerStyle ={styles.CheckBoxContainer}
        textStyle={styles.CheckBoxtext}
        title="Special offers"
       />
       <CheckBox
        containerStyle ={styles.CheckBoxContainer}
        textStyle={styles.CheckBoxtext}
        title="Newsletter"
       />


        <Pressable>
          <Text style ={styles.buttonText3}>
            Logout
          </Text>
        </Pressable>

     </View>

     <View style = {styles.Innercontainer2}>

     <Pressable onPress={discardChanges}>
          <Text style ={styles.buttonText2}>
            Discard changes
          </Text>
        </Pressable>

        <Pressable onPress={saveData}>
          <Text style ={styles.buttonText1}>
            Save changes
          </Text>
        </Pressable>

     </View>


    </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',  
  },

  Innercontainer1: {
    flex: 0.15,
    backgroundColor: '#FFFFFF',  
  },

  Innercontainer2: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', 
    marginTop: 10, 
  },

  Innercontainer3: {
    flex: 0.35,
    backgroundColor: '#FFFFFF', 
    marginTop: 10, 
  },


  textBlock: {
    color: '#111111',
    fontSize: 20,
    marginTop: '1%',
    marginBottom: '1%',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  ProfilePic: {
    height: 70,
    width:70,
    marginLeft: 10,
    borderRadius: 100,
    
  },

  buttonText1: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 7,
    padding: 3,
    marginLeft: '17%',
    borderColor: '#495E57',
    backgroundColor: '#495E57',
  },

  buttonText2: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#495E57',
    borderWidth: 2,
    borderRadius: 7,
    padding: 3,
    marginLeft: '17%',
    borderColor: '#495E57',
    backgroundColor: '#FFFFFF',
  },

  buttonText3: {
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#495E57',
    borderWidth: 2,
    borderRadius: 7,
    padding: 5,
    marginHorizontal: '5%',
    borderColor: '#E3BD13',
    backgroundColor: '#F4CE14',
    fontWeight: 'bold',
  },

  textinputheader: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    color: '#495E57',
    fontSize: 12,
  },

  input: {
    height: 36,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 14,
    borderColor: '#495E57',
    marginHorizontal: 10,
  },

  CheckBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 7,
  },

  CheckBoxtext: {
    fontSize: 15,
    color: '#495E57',
  },

  placeholder: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginLeft:10,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderText: {
    fontSize: 35,
    color: 'white',
    textAlign: 'center',
  },

  
});

export default Profile;

