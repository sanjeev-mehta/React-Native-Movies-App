import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './src/components/header/header';
import MoviePage from './src/components/movie-page/movie-page';
import SearchPage from './src/components/search-page/search-page';
import TVPage from './src/components/tv-page/tv-page';
import DetailPage from './src/components/detail-page/detail-page';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Movie" component={MoviePage} options={{ headerShown: false }} />
    <Stack.Screen name="Detail" component={DetailPage} options={{ title: 'Detail' }} />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={SearchPage} options={{ headerShown: false }} />
    <Stack.Screen name="Detail" component={DetailPage} options={{ title: 'Details' }} />
  </Stack.Navigator>
);
const TVStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="TV" component={TVPage} options={{ headerShown: false }} />
    <Stack.Screen name="Detail" component={DetailPage} options={{ title: 'Details' }} />
  </Stack.Navigator>
);
const DetailStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Detail" component={DetailPage} options={{ title: 'Details' }} />
  </Stack.Navigator>
);
const App = () => {
  return (
    <View style={styles.container}>
      <Header title="Movies App" />
      <StatusBar style="auto" />
      <View style={{ flex: 1, paddingTop: 100 }}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Movies" component={MoviesStack} />
            <Tab.Screen name="Search Results" component={SearchStack} />
            <Tab.Screen name="TV Shows" component={TVStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;