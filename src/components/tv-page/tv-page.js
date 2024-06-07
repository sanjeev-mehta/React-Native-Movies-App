import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import ApiHelper from '../api-helper/api-helper';
import ItemList from '../item-list/item-list';
import { useNavigation } from '@react-navigation/native';
import { Actionsheet, useDisclose, NativeBaseProvider } from 'native-base';

const apiInstance = new ApiHelper();

const TVPage = () => {
  const navigation = useNavigation();
  const [selectedValue, setSelectedValue] = useState('Select an option');
  const [selectedOption, setSelectedOption] = useState('airing_today');
  const [movies, setMovies] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();

  const items = [
    { label: 'Airing Today', value: 'airing_today' },
    { label: 'On the Air', value: 'on_the_air' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' }
  ];

  const selectItem = async (item) => {
    setSelectedValue(item.label);
    setSelectedOption(item.value);
    onClose();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await apiInstance.fetchTVShows(selectedOption);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, [selectedOption]);

  useEffect(() => {
    selectItem({ label: 'Airing Today', value: 'airing_today' });
  }, []);

  const handleMoviePress = (item) => {
    let route = { id: item.id, type: 'movie' };
    navigation.navigate('Detail', { route });
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <TouchableOpacity style={styles.box} onPress={onOpen}>
          <Text>{selectedValue}</Text>
        </TouchableOpacity>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            {items.map((item) => (
              <TouchableOpacity key={item.value} onPress={() => selectItem(item)} style={styles.option}>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Actionsheet.Content>
        </Actionsheet>

        <View style={styles.movieContainer}>
          <ItemList data={movies} onPressItem={(item) => handleMoviePress(item)} />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: '50%',
    marginLeft: -100,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
  },
  movieContainer: {
    top: 70,
    marginBottom: 100
  }
});

export default TVPage;
