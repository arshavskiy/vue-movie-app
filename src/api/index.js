import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const Authorization = import.meta.env.VITE_API_KEY

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${Authorization}`,
  },
});

export const fetchPopularMovies = async (page = 1) =>
  await axiosInstance.get(`/movie/popular?page=${page}`);

export const fetchMovieDetails = (id) =>
  axiosInstance.get(`/movie/${id}`);

export const fetchRecentMovies = async () => {
  const today = new Date().toISOString().split('T')[0];
  const ninetyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 90))
    .toISOString()
    .split('T')[0];
  return await axiosInstance.get(
    `/discover/movie?primary_release_date.gte=${ninetyDaysAgo}&primary_release_date.lte=${today}`
  );
};
