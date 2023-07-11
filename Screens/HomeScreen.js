import React from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';

const HomeScreen = () => {
  return (

    <View style = {styles.container}>

     <Text style={styles.textBlock}>
     Home Page
     </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#111111',  
  },


  textBlock: {
    color: '#F4CE14',
    textAlign: 'center',
    fontSize: 26,
    fontStyle: 'italic',
    marginTop: 20,
  },

  
});

export default HomeScreen;

