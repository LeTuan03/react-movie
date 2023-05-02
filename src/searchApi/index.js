import axios from "axios";

export const API_KEY = "api_key=953df622378ed702e53753e6e761769f";
export const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
export const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
export const srcVideo = BASE_URL + "/movie/";
export const URLTOPRATE =
  BASE_URL +
  "/movie/top_rated?api_key=953df622378ed702e53753e6e761769f&language=en-US&page=1";
export const UPCOMING_URL =
  srcVideo + "upcoming?" + API_KEY + "&language=en-US&page=1";

export const get = async (url) => {
  const response = await axios.get(url || API_URL);
  return response.data;
};

export const add = async (employee) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

// export const update = async (id, employee) => {
//   const response = await axios.put(`${API_URL}/${id}`, employee);
//   return response.data;
// };

// export const del = async (id) => {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// };
