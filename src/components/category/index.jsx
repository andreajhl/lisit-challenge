import { useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useQueryParams } from '../../hooks/useQueryParams';
import { useDebounce } from '../../hooks/useDebounce';
import Pagination from '../ui/pagination';
import CardEmpty from '../ui/cardEmpty';
import wordings from "../../wordings";
import './styles.scss';

const INTERVAL_TIME = 300;

const Category = () => {
  const { categories, warnings } = wordings;

  const { category } = useParams();
  const { data: { list, pages }, previuos } =  useLoaderData();
  const { querys: { search, page }, setQuery } = useQueryParams();

  const [categoryData, setCategoryData] = useState({ list, pages });
  const [currentPage, setCurrentPage] = useState(page - 1);
  const setQueryDebounced = useDebounce(setQuery, INTERVAL_TIME);

  const getNextPage = async () => {
    const queryParams = {
      page: currentPage + 1,
      ...(search && { search }),
    };
    
    setQueryDebounced(queryParams);
  };

  useEffect(() => {
    if (currentPage || currentPage === 0) {
      getNextPage();
    }
  }, [currentPage]);
  useEffect(() => {
    setCategoryData({ ...categoryData, list });
  }, [list]);
  useEffect(() => { 
    if(previuos) {
      setCurrentPage(0);
      setCategoryData({ ...categoryData, pages });
    }
  }, [previuos])
  
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
    </div>
  );
};

export default Category;
