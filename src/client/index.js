import axios from 'axios';
import { logErrors } from '../utils/logErros';
import { FILMS, PEOPLE, PLANETS, STARSHIPS } from '../constants/category';
import {
  formatFilmsDetail,
  formatPeopleDetail,
  formatPlanetsDetail,
  formatStarshipDetail,
} from './mappers';

const BASE_URL = import.meta.env.VITE_API_URL
const api = axios.create({ baseURL: BASE_URL });

export const getDataFromUrls = async (urlArrays) => {
  const SUCCESS_STATUS = 'fulfilled';
  const dataPromise = urlArrays.map(url => axios.get(url));
  const dataResult = await Promise.allSettled(dataPromise);

  return dataResult
          .filter(req => req.status === SUCCESS_STATUS)
          .map(item => item.value.data)
};

export const getCategory = async (category, params = {}) => {
  const LOG_MESSAGE = `GET CATEGORY - ${category.toUpperCase()}`;

  try {
    const { data } = await api.get(category, { params });
    return data;
  } catch (error) {
    logErrors(error, LOG_MESSAGE);
  }
};

export const getCategories = async () => {
  const LOG_MESSAGE = 'GET CATEGORIES';

  try {
    const { data: { people, planets, starships } } = await api.get();
    return { people, planets, starships };
  } catch (error) {
    logErrors(error, LOG_MESSAGE);
  }
};

export const getCategoryDetail = async (category, id) => {
  const LOG_MESSAGE = `GET ${category.toUpperCase()} DETAIL: ${id}`;

  try {
    const { data } = await api.get(`/${category}/${id}`);
    return data;
  } catch (error) {
    logErrors(error, LOG_MESSAGE);
    throw error;
  }
};

export const getFilmsDetail = async (id) => {
  try {
    const data = await getCategoryDetail(FILMS, id);
    return formatFilmsDetail(data);
  } catch (error) {
    logErrors(error);
  }
};

export const getStarshipsDetail = async (id) => {
  try {
    const { films, pilots, ...data } = await getCategoryDetail(STARSHIPS, id);
    const filmsData = await getDataFromUrls(films);
    const pilotsData = await getDataFromUrls(pilots);
  
    return formatStarshipDetail(data, filmsData, pilotsData);
  } catch (error) {
    logErrors(error);
  }
};

export const getPlanetsDetail = async (id) => {
  try {
    const { films, residents, ...data } = await getCategoryDetail(PLANETS, id);
    const filmsData = await getDataFromUrls(films);
    const residentsData = await getDataFromUrls(residents);
  
    return formatPlanetsDetail(data, filmsData, residentsData);
  } catch (error) {
    logErrors(error);
  }
};

export const getPeopleDetail = async (id) => {
  try {
    const { films, starships, ...data } = await getCategoryDetail(PEOPLE, id);
    const filmsData = await getDataFromUrls(films);
    const starshipsData = await getDataFromUrls(starships);

    return formatPeopleDetail(data, filmsData, starshipsData);
  } catch (error) {
    logErrors(error);
  }
};
