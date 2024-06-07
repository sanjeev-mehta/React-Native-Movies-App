import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import ItemList from '../item-list/item-list';
import ApiHelper from '../api-helper/api-helper';
import { useNavigation } from '@react-navigation/native';
import { Actionsheet, useDisclose, NativeBaseProvider } from 'native-base';

const apiInstance = new ApiHelper();

const MoviePage = ({ title }) => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Select an option');
  const [selectedOption, setSelectedOption] = useState('now_playing');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const { isOpen, onOpen, onClose } = useDisclose();

  const items = [
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectItem = async (item) => {
    setSelectedValue(item.label);
    setSelectedOption(item.value);
    toggleModal();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const fetchedMovies = await apiInstance.fetchMovies(selectedOption);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [selectedOption]);

  useEffect(() => {
    selectItem({ label: 'Now Playing', value: 'now_playing' });
  }, []);

  const handleMoviePress = (item) => {
    const route = { id: item.id, type: "movie" }
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
              <Actionsheet.Item key={item.value} onPress={() => selectItem(item)}
                style={selectedOption === item.value ? styles.selectedItem : styles.unselectedItem}
              >
                {item.label}
              </Actionsheet.Item>
            ))}
            <Actionsheet.Item onPress={onClose}>Cancel</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>

        {isLoading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
        ) : movies.length === 0 ? ( 
          <Text style={styles.label}>No movies found</Text>
        ) : ( 
          <View style={styles.movieContainer}>
            <ItemList data={movies} onPressItem={handleMoviePress} navigation={navigation} />
          </View>
        )}
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
  movieContainer: {
    top: 70,
    marginBottom: 100,
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  unselectedItem: {
    backgroundColor: '#fff',
  },
  label: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  loader: {
    marginTop: 20,
  },
});

export default MoviePage;
