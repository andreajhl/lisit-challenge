import { render } from '@testing-library/react';
import CardMedia from '.';

const renderCardMedia = () => (
  render(
    <CardMedia
      url='http://test.com'
      title='test'
    />
  )
);

describe('<CardMedia />', () => {
  it('renders CardMedia correctly', () => {
    const { getByText } = renderCardMedia();
    expect(getByText('test')).toBeInTheDocument();
  });
});
