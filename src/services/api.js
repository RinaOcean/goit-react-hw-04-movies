import axios from 'axios';
import { Component } from 'react';

const API_KEY = 'cf67346d4a1073d4492c64be3b76153f';
const BASE_URL = 'https://api.themoviedb.org/3';

// список самых популярных фильмов на сегодня для создания коллекции на главной странице.
// ${BASE_URL}/trending/all/day?api_key=${cf67346d4a1073d4492c64be3b76153f}

// поиск кинофильма по ключевому слову на странице фильмов.
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&&query=""page=1&include_adult=false

// запрос полной информации о фильме для страницы кинофильма.
//api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

// запрос информации о актёрском составе для страницы кинофильма.
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US

// запрос обзоров для страницы кинофильма.
// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1

export default class ApiMovies {
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
    // console.log();
  }
}
