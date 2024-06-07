import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ApiHelper from '../api-helper/api-helper';
import { useNavigation } from '@react-navigation/native'; 

const apiInstance = new ApiHelper();

const DetailPage = ({ route }) => {
  const { id, type } = route.params.route;
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await apiInstance.fetchMediaDetails(id, type);
        setDetails(data);
        navigation.setOptions({ title: data.title || data.name || 'Detail' });
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchDetails();
  }, [id, type, navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No details found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{details.title || details.name}</Text>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${details.poster_path}` }} style={styles.image} />
        <Text style={styles.description}>{details.overview}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Popularity: {details.popularity} | Release Date: {details.release_date || details.first_air_date}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 20,
    borderRadius: 12
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailText: {
    fontSize: 10,
  },
});

export default DetailPage;
