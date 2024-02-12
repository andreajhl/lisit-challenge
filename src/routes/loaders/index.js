import {
  getCategories,
  getCategory,
  getFilmsDetail,
  getPeopleDetail,
  getPlanetsDetail,
  getStarshipsDetail,
} from '../../client';
import {
  formatFilmsData,
  formatPeopleData,
  formatPlanetsData,
  formatCategoryData,
  formatStarshipsData,
} from '../mappers';

export const categoriesLoader = async () => getCategories();

export const peopleLoader = async ({ params: { id } }) => {
  const data = await getPeopleDetail(id);
  return formatPeopleData(data);
}

export const filmsLoader = async ({ params: { id } }) => {
  const data = await getFilmsDetail(id);
  return formatFilmsData(data);
}

export const planetsLoader = async ({ params: { id } }) => {
  const data = await getPlanetsDetail(id);
  return formatPlanetsData(data);
}

export const starshipsLoader = async ({ params: { id } }) => {
  const data = await getStarshipsDetail(id);
  return formatStarshipsData(data);
}

export const categoryLoader = async ({ params: { category } }) => {
  const data = await getCategory(category);
  return formatCategoryData(data, category)
}
