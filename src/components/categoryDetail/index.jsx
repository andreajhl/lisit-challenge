import { Link, useLoaderData } from 'react-router-dom';
import { PEOPLE, PILOTS, RESIDENTS } from '../../constants/category';
import wordings from '../../wordings';
import './styles.scss';

const CategoryDetails = () => {
  const { details: { characteristics, additional } } = wordings;
  const {
    title,
    subtitle,
    additionalInformation: additionalData,
    characteristics: characteristicsData,
  } =  useLoaderData();

  const generateUrl = (category, id) => {
    const categoriesOfPeople = [PILOTS, RESIDENTS, PEOPLE];
    const baseUrl = categoriesOfPeople.includes(category) ? PEOPLE : category;
    return `../${baseUrl}/${id}`;
  };

  return (
    <div className='category-detail'>
      <div className='category-detail__container'>
        <h2 className='category-detail__title'>{title}</h2>
        <p className='category-detail__subtitle'>{subtitle}</p>
        <div className='category-detail__content'>
          <div className='category-detail__characteristics'>
            <h3 className='category-detail__characteristics-title'>
              {characteristics.title}
            </h3>
            <div className='category-detail__characteristics-list'>
              {Object.keys(characteristicsData).map(item => (
                <div key={item} className='category-detail__characteristic'>
                  <h4 className='category-detail__characteristic-name'>
                    {characteristics[item]}
                  </h4>
                  <p className='category-detail__characteristic-value'>
                    {characteristicsData[item]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {additionalData && (
            <div className='category-detail__additional'>
              {Object.keys(additionalData).map(item => (
                <div key={item} className='category-detail__additional-content'>
                  <h3 className='category-detail__additional-title'>
                    {additional[item]}
                  </h3>
                  <div className='category-detail__additional-links'>
                    {additionalData[item].map(({ name, id }) => (
                      <Link
                        key={id}
                        relative='route'
                        to={generateUrl(item, id)}
                        className='category-detail__additional-link'
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
