import React from 'react';
import { View, Image, StyleSheet, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { color } from 'react-native-reanimated';

const Profile = ({navigation}) => {
  return (

    <ScrollView style = {styles.container}>

      <View style = {styles.Innercontainer1}>
        <Text style = {styles.textBlock}>
          Personal information
        </Text>
      </View>

      <View style = {styles.Innercontainer2}>
        <Image 
        style = {styles.ProfilePic}
        source={require("../assets/Profile.png")}/>

        <Pressable>
          <Text style ={styles.buttonText1}>
            Change
          </Text>
        </Pressable>

        <Pressable>
         <Text style ={styles.buttonText2}>
          Remove
         </Text>
        </Pressable>
      </View>

      <View style ={styles.Innercontainer3}>

        <Text style ={styles.textinputheader}>
          First Name
        </Text>
        <TextInput style ={styles.input}/>
        

        <Text style ={styles.textinputheader}>
          Last Name
        </Text>
        <TextInput style ={styles.input}/>

        <Text style ={styles.textinputheader}>
          Email
        </Text>
        <TextInput style ={styles.input}/>

        <Text style ={styles.textinputheader}>
          Phone Number
        </Text>
        <TextInput style ={styles.input}/>

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

     <Pressable>
          <Text style ={styles.buttonText2}>
            Discard changes
          </Text>
        </Pressable>

        <Pressable>
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
    height: 80,
    width:80,
    marginLeft: 10,
    
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

  
});

export default Profile;

