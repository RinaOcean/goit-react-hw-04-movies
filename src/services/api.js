import axios from 'axios';
// import { Component } from 'react';
import apiSettings from '../services/apiSettings';

const { API_KEY, BASE_URL } = apiSettings;

class ApiMovies {
  constructor() {
    this.searchQuery = '';
    this.movieId = '';
    this.page = 1;
    this.trendingMovies = [];
  }

  async getTrending() {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
    );

    return response.data.results;
  }

  async getMovieDetails(movieId) {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
    );
    return response.data;
  }

  async getMoviesByQuery(query) {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
    );
    return response.data.results;
  }

  async getCast(movieId) {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
    );
    return response.data.cast;
  }

  async getReviews(movieId) {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
    );
    return response.data.results;
  }
}

export default ApiMovies;
