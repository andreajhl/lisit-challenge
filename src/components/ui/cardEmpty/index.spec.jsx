import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CardEmpty from '.';

const renderCardEmpty = () => (
  render(
    <MemoryRouter>
      <CardEmpty
        url='http://test.com'
        title='test'
        code={400}
      />
    </MemoryRouter>
  )
);

describe('<CardEmpty />', () => {
  it('renders CardEmpty correctly', () => {
    const { getByText } = renderCardEmpty();
    expect(getByText('test')).toBeInTheDocument();
  });
});
