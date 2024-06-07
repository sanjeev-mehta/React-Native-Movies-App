import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemList from '../item-list/item-list';
import ApiHelper from '../api-helper/api-helper';
import { useNavigation } from '@react-navigation/native';
import { Actionsheet, useDisclose, NativeBaseProvider } from 'native-base';

const apiInstance = new ApiHelper();

const SearchPage = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchType, setSearchType] = useState('movie');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedOption, setSelectedOption] = useState('movie');
  const [isShowErrorMessage, setShowErrorMessage] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      setShowErrorMessage(false);
      setIsLoading(true);
      try {
        const results = await apiInstance.searchMedia(searchQuery, searchType);
        setMovies(results);
      } catch (error) {
        console.error('Error searching media:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowErrorMessage(true);
      console.log('Search query is empty');
    }
  };

  const handleSelectType = (type) => {
    setSearchType(type);
    setSelectedOption(type);
    onClose();
  };

  const handleMoviePress = (item) => {
    console.log(item);
    const route = { id: item.id, type: item.media_type };
    navigation.navigate('Detail', { route });
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.title}>
          Search Movie/TV Show Name
          <Text style={styles.redAsterisk}>*</Text>
        </Text>
        <View style={[styles.searchContainer, isShowErrorMessage && styles.inputError]}>
          <Icon name="search" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="i.e. James Bond, CSI"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.horizontalStack}>
          <TouchableOpacity style={styles.selectButton} onPress={onOpen}>
            <Text style={styles.selectedText}>{searchType === 'tv' ? 'TV Shows' : searchType === 'movie' ? 'Movies' : 'Multi (TV and Movies)'}</Text>
            <Icon name="angle-down" size={20} style={styles.arrowIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.seacrhBtnText}>Search</Text>
          </TouchableOpacity>
        </View>
        {isShowErrorMessage === true && (
          <Text style={styles.validationMessage}>
            Movie/TV show name is required
          </Text>
        )}
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <TouchableOpacity
              style={[styles.option, selectedOption === 'tv' && styles.selectedOption]}
              onPress={() => handleSelectType('tv')}
            >
              <Text style={styles.optionText}>TV Shows</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, selectedOption === 'movie' && styles.selectedOption]}
              onPress={() => handleSelectType('movie')}
            >
              <Text style={styles.optionText}>Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, selectedOption === 'multi' && styles.selectedOption]}
              onPress={() => handleSelectType('multi')}
            >
              <Text style={styles.optionText}>Multi (TV and Movies)</Text>
            </TouchableOpacity>
          </Actionsheet.Content>
        </Actionsheet>

        {isLoading ? (
          <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
        ) : movies.length === 0 ? (
          <Text style={styles.label}>Please initiate the search</Text>
        ) : (
          <View style={styles.movieContainer}>
            <ItemList data={movies} onPressItem={(item) => handleMoviePress(item)} />
          </View>
        )}
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: '#ccc',
  },
  input: {
    flex: 1,
  },
  horizontalStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    marginRight: 10,
  },
  arrowIcon: {
    marginRight: 10,
    marginLeft: 10,
    color: '#ccc',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    backgroundColor: "#007BFF",

  },
  movieContainer: {
    top: 20,
    marginBottom: 100
  },
  selectedItem: {
    backgroundColor: '#d3d3d3',
  },
  unselectedItem: {
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  selectedText: {
    fontSize: 12,
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
  seacrhBtnText: {
    color: 'white'
  },
  redAsterisk: {
    color: 'red',
  },
  validationMessage: {
    fontSize: 10,
    color: 'red'
  },
  inputError: {
    borderColor: 'red', 
  },
});

export default SearchPage;
