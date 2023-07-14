import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import FlatListSeparator from '../components/FlatListSeparator';
import * as SQLite from 'expo-sqlite';



export default HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const openDatabase = () => {
    const db = SQLite.openDatabase('little_lemon.db');
    return db;
  };

  const createTable = () => {
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT, category TEXT);'
      );
    });
  };

  const getMenu = async () => {
    try {
      const db = openDatabase();
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM menu', [], (_, { rows }) => {
          if (rows.length === 0) {
            // If no data stored, fetch from remote server and store in database
            fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
              .then((response) => response.json())
              .then((json) => {
                const menuItems = json.menu;
                db.transaction((tx) => {
                  menuItems.forEach((item) => {
                    tx.executeSql(
                      'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);',
                      [item.name, item.price, item.description, item.image, item.category]
                    );
                  });
                });
                setData(menuItems);
              })
              .catch((error) => console.error(error));
          } else {
            // If data already stored, load from database
            setData(rows._array);
          }
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    createTable();
    getMenu();
  }, []);

 

  const Item = ({ name, description, price, image }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const toggleDescription = () => {
      setShowFullDescription(!showFullDescription);
    };
  
    const characterLimit = 70;
    const shouldTruncate = description.length > characterLimit;
    const truncatedDescription = shouldTruncate ? description.slice(0, characterLimit) + '...' : description;
  
    return (
      <TouchableOpacity onPress={toggleDescription}>
        <View style={menuStyles.innerContainer}>
          <View style={{ flex: 0.7 }}>
            <Text style={menuStyles.itemName}>{name}</Text>
            <Text style={menuStyles.itemDescription}>
              {showFullDescription ? description : truncatedDescription}
            </Text>
            <Text style={menuStyles.itemPrice}>{'$' + price}</Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Image
              source={{
                uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
              }}
              style={menuStyles.itemImage}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  

  const renderItem = ({ item }) => (
    <Item name={item.name} description= {item.description} price={item.price} image={item.image} />
  );

  return (
    <SafeAreaView style={menuStyles.container}>
      <Text style={menuStyles.headerText}>Little Lemon Menu</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.name + index}
          renderItem={renderItem}
          ItemSeparatorComponent={FlatListSeparator}
          
          
        />
      )}
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#666666',
    fontSize: 13,
    marginTop:7,
  },
  itemPrice: {
    color: '#666666',
    fontSize: 16,
    marginTop:7,
  },
  itemImage: {
    width: '80%',
    height: 90,
    resizeMode: 'cover',
    marginLeft: 20,
    borderRadius: 100,
  },
  headerText: {
    color: '#495E57',
    fontSize: 30,
    textAlign: 'center',
  },
});
