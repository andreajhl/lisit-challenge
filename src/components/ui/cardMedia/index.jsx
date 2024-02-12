import './styles.scss';

const CardMedia = ({ url, title }) => (
  <article className="card">
    <img src={url} alt={title} className="card__img" />
    <h3 className="card__title">{title}</h3>        
  </article>
);

export default CardMedia;
