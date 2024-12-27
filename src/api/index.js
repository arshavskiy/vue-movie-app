import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWRhOWZhZGI1YzYxOTJiMGYyNWY2Mzk2YTdkM2YwMSIsIm5iZiI6MTczNTI4Njk2Mi4xMTIsInN1YiI6IjY3NmU2MGIyZDZkMTBlY2M4YzEyYWU4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AeICoiEnQ-B8c0ywHVa3Ks2Zb_OGpn_EQMNvC8UvJKE',
  },
});

export const fetchPopularMovies = (page = 1) =>
  axiosInstance.get(`/movie/popular?page=${page}`);

export const fetchMovieDetails = (id) =>
  axiosInstance.get(`/movie/${id}`);

export const fetchRecentMovies = () => {
  const today = new Date().toISOString().split('T')[0];
  const ninetyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 90))
    .toISOString()
    .split('T')[0];
  return axiosInstance.get(
    `/discover/movie?primary_release_date.gte=${ninetyDaysAgo}&primary_release_date.lte=${today}`
  );
};
