import { Link, useLoaderData } from "react-router-dom";
import wordings from "../../wordings";
import './styles.scss';
import CardMedia from "../ui/cardMedia";

const Home = () => {
  const { home: { categories, title } } = wordings;

  const categoryList =  useLoaderData();
  const assets = {
    people: '/assets/images/people.png',
    planets: '/assets/images/planets.png',
    starships: '/assets/images/starships.png',
  };

  return (
    <div className='home'>
      <h3 className='home__title'>{title}</h3>
      <div className='home__category-list'>
        {
          Object.keys(categoryList).map(category => (
            <Link
              key={category}
              to={`category/${category}`}
            >
              <CardMedia
                url={assets[category]}
                title={categories[category]}
              />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
