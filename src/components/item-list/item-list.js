import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const MovieItem = ({ item, onPressItem }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.title || item.name}</Text>
      <Text style={styles.popularity}>Popularity: {item.popularity}</Text>
      <Text style={styles.releaseDate}>Release Date: {item.releaseDate}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPressItem(item)}>
        <Text style={styles.buttonText}>More Details</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ItemList = ({ data, onPressItem, navigation }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <MovieItem item={item} onPressItem={onPressItem} navigation={navigation} />}
    contentContainerStyle={styles.listContainer}
  />
);


const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 24,
    marginRight: 24,
    width: 300
  },
  image: {
    width: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },
  popularity: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ItemList;
