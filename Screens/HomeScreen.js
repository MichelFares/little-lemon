import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
    fetchCategoriesFromDatabase();
  }, []);

  useEffect(() => {
    fetchDataFromDatabase();
  }, [selectedCategories]);

  useEffect(() => {
    const debouncedFilter = debounce(filterMenuItems, 500);
    debouncedFilter();
  }, [searchQuery]);

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
            <Text style={menuStyles.itemDescription}>{showFullDescription ? description : truncatedDescription}</Text>
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
    <Item name={item.name} description={item.description} price={item.price} image={item.image} />
  );

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const fetchDataFromDatabase = () => {
    if (searchQuery) {
      filterMenuItems();
    } else {
      const db = openDatabase();
      const query = selectedCategories.length > 0
        ? `SELECT * FROM menu WHERE category IN (${selectedCategories.map(() => '?').join(',')})`
        : 'SELECT * FROM menu';
  
      db.transaction((tx) => {
        tx.executeSql(query, selectedCategories, (_, { rows }) => {
          setFilteredData(rows._array);
        });
      });
    }
  };
  

  const isSelectedCategory = (category) => selectedCategories.includes(category);

  const fetchCategoriesFromDatabase = () => {
    const db = openDatabase();
    db.transaction((tx) => {
      tx.executeSql('SELECT DISTINCT category FROM menu', [], (_, { rows }) => {
        const categoriesFromDB = rows._array.map((row) => ({ category: row.category }));
        setCategories(categoriesFromDB);
      });
    });
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const filterMenuItems = async () => {
    const db = openDatabase();
    const query = selectedCategories.length > 0
      ? `SELECT * FROM menu WHERE name LIKE '%${searchQuery}%' AND category IN (${selectedCategories.map(() => '?').join(',')})`
      : `SELECT * FROM menu WHERE name LIKE '%${searchQuery}%'`;
  
    db.transaction((tx) => {
      tx.executeSql(query, selectedCategories, (_, { rows }) => {
        setFilteredData(rows._array);
      });
    });
  };

  return (
    <SafeAreaView style={menuStyles.container}>
      <View style={menuStyles.blockcontainer}>
        <Text style={menuStyles.headerText}>Little Lemon</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 0.5 }}>
            <Text style={menuStyles.LocationText}>Chicago</Text>
            <Text style={menuStyles.DescriptionText}>We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          </View>
          <Image source={require('../assets/Heroimage.png')} style={menuStyles.DescriptionImage} />
        </View>

        <View style={menuStyles.inputContainer}>
          <TouchableOpacity style={menuStyles.searchIconContainer} onPress={() => console.log('Search pressed')}>
            <Icon name="search" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TextInput
            style={menuStyles.input}
            value={searchQuery}
            placeholder="Search dishes..."
            onChangeText={(text) => setSearchQuery(text)}
          />

        </View>
      </View>

      <View style={{borderBottomColor: '#AAAAAA', borderBottomWidth: 0.2}}>
        <Text style={menuStyles.DeliveryText}>ORDER FOR DELIVERY!</Text>

        <ScrollView horizontal>
          <View style={{flexDirection: 'row' }}>
            {categories.map((item) => (
              <Pressable key={item.category} onPress={() => toggleCategory(item.category)}>
                <Text style={[menuStyles.buttonText, isSelectedCategory(item.category) && menuStyles.selectedButtonText]}>
                  {item.category}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={renderItem}
          
          
        />
      )}
    </SafeAreaView>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#AAAAAA'
    
  },
  blockcontainer: {
    backgroundColor: '#495E57',
  },
  itemName: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#666666',
    fontSize: 13,
    marginTop: 7,
  },
  itemPrice: {
    color: '#666666',
    fontSize: 16,
    marginTop: 7,
  },
  itemImage: {
    width: '80%',
    height: 90,
    resizeMode: 'cover',
    marginLeft: 20,
    borderRadius: 100,
  },
  headerText: {
    color: '#F4CE14',
    fontSize: 30,
    marginLeft: 10,
    marginBottom: -15,
  },
  LocationText: {
    color: '#FFFFFF',
    fontSize: 22,
    marginLeft: 10,
  },
  DescriptionText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
    marginTop: 13,
  },
  DescriptionImage: {
    flex: 0.4,
    height: 160,
    borderRadius: 20,
    marginRight: 20,
  },
  DeliveryText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#111111',
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderColor: '#BBBBBB',
    backgroundColor: '#BBBBBB',
  },
  selectedButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#F4CE14',
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderColor: '#FFFFFF',
    backgroundColor: '#495E57',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#111111',
    borderRadius: 7,
    paddingHorizontal: 5,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 35,
    fontSize: 18,
    color: '#555555',
  },
  searchIconContainer: {
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
