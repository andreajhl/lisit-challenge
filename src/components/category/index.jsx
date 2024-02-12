import { useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useQueryParams } from '../../hooks/useQueryParams';
import { formatCategoryData } from '../../routes/mappers';
import { logErrors } from '../../utils/logErros';
import { getCategory } from '../../client';
import Pagination from '../ui/pagination';
import CardEmpty from '../ui/cardEmpty';
import Alert from '../ui/alert';
import wordings from "../../wordings";
import './styles.scss';

const Category = () => {
  const { categories, notFound, warnings } = wordings;

  const { category } = useParams();
  const { pages, list } =  useLoaderData();
  const { querys: { search }, setQuery } = useQueryParams();

  const [categoryData, setCategoryData] = useState({ list, pages });
  const [currentPage, setCurrentPage] = useState();
  const [alert, setAlert] = useState();

  const getCategoryData = async (params) => {
    try {
      const data = await getCategory(category, params);
      return formatCategoryData(data);
    } catch (error) {
      logErrors(error);
      setAlert({ show: true, status: 'error', ...notFound });
    }
  };

  const getNextPage = async () => {
    const params = { page: currentPage + 1, ...(search && { search }) };

    const data = await getCategoryData(params);
    if (data) setCategoryData({ ...categoryData, list: data.list });
  }

  const getSearchCategory = async () => {
    const data = await getCategoryData({ search });
    data ? setCategoryData(data) : setQuery({});
  };

  useEffect(() => { search && getSearchCategory() }, [search]);
  useEffect(() => { (currentPage || currentPage === 0) && getNextPage() }, [currentPage]);

  return (
    <div className='category'>
      <div className='category__main'>
        <h2 className='category__main-title'>{categories[category].title}</h2>
        {
          categoryData.list.length
            ? (
              <div className='category__main-list'>
                {
                  categoryData.list.map(item => (
                    <Link
                      to={item.id}
                      key={item.id}
                      className='category__item'
                    >
                      <h3 className='category__item-title'>{item.name}</h3>
                      <p className='category__item-subtitle'>
                        {categories.films} {item.films}
                      </p>  
                    </Link>
                  ))         
                }
              </div>
            )
            : (
              <CardEmpty
                {...warnings.empty}
                link={`../${category}`}
              />
            )
        }
      </div>
      {
        categoryData.pages > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            availablePages={categoryData.pages}
          />
        )
      }
      { alert?.show && <Alert {...alert} />}
    </div>
  );
};

export default Category;
