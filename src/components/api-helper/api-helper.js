// api.js

import axios from 'axios';

const apiKey = '2caeac941e3a9dd60a568de26735458b'; 

class ApiHelper {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  async fetchMovies(endpoint, params = {}) {
    console.log(endpoint)
    try {
      const response = await axios.get(`${this.baseURL}/movie/${endpoint}`, {
        params: {
          api_key: apiKey,
          ...params,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  async fetchTVShows(endpoint, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/tv/${endpoint}`, {
        params: {
          api_key: apiKey,
          ...params,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      throw error;
    }
  }

  async searchMedia(query, type = 'movie', params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/search/${type}`, {
        params: {
          api_key: apiKey,
          query,
          ...params,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching media:', error);
      throw error;
    }
  }

  async fetchMediaDetails(id, type = 'movie') {
    console.log(`${this.baseURL}/${type}/${id}`)
    try {
      const response = await axios.get(`${this.baseURL}/${type}/${id}`, {
        params: {
          api_key: apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching media details:', error);
      throw error;
    }
  }
}

export default ApiHelper;
