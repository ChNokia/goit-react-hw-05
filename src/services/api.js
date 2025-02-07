import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const DEFAULT_END_POINT = 'trending/movie/week';
const DEFAULT_SEARCH_PARAM = { include_adult: false, language: 'en-US' };

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMovies = async (page = 1) => {
  const data = await fetchData(DEFAULT_END_POINT, { page });

  return data;
};

export const searchMoviesByQuery = async (
  query,
  params = DEFAULT_SEARCH_PARAM
) => {
  const data = await fetchData('search/movie', { query, ...params });
  return data;
};

export const getMovieDetailsById = async movieId => {
  const movieData = await fetchData(`movie/${movieId}`);
  return movieData;
};

export const getMoviCredits = async movieId => {
  const movieCast = await fetchData(`movie/${movieId}/credits`);
  return movieCast;
};

export const getMovieReviews = async movieId => {
  const movieCast = await fetchData(`movie/${movieId}/reviews`);
  return movieCast;
};

const fetchData = async (endPoint = DEFAULT_END_POINT, properties = {}) => {
  const fullParams = {
    ...options,
    params: {
      ...properties,
    },
  };
  const response = await axios(endPoint, fullParams);

  return response.data;
};
