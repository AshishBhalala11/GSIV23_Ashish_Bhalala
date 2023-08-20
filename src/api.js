import axios from "axios";

const API_KEY = "f25c22cba8ef5398237f7e0870c405cc";
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchUpcomingMovies = async (pageNo) => {
	const params = {
		api_key: API_KEY,
	};
	if (pageNo) {
		params['page'] = pageNo;
	}
  const response = await axios.get(`${API_BASE_URL}/movie/upcoming`, {
    params
  });
  return response.data.results;
};

export const searchMovies = async (query, pageNo) => {
  const params= {
    api_key: API_KEY,
    query,
  }
  if (pageNo) {
		params['page'] = pageNo;
	}
  const response = await axios.get(`${API_BASE_URL}/search/movie`, {
    params
  });
  return response.data.results;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};
