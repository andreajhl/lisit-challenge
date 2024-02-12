import wordings from '../../wordings';
import './styles.scss';

const Loading = () => {
  const { warnings: { loading } } = wordings;

  return (
    <main className='loading'>
      <span className='loading__spinner'></span>
      <p className='loading__text'>{loading}</p>
    </main>
  );
};

export default Loading;