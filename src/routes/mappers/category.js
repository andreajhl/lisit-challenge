import { matchNumber } from '../../utils/regex';

const getTotalPage = (count, results) => Math.ceil(count / results.length);

export const formatCategoryData = ({ count, results }) => {
  const pages = getTotalPage(count, results);
  const list = results.map(item => ({
    id: matchNumber(item.url),
    name: item.name,
    films: item.films?.length,
  }));

  return { list, pages };
};
