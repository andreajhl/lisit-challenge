import { render } from '@testing-library/react';
import wordings from '../../wordings';
import Loading from '.';

const { warnings: { loading } } = wordings;
const renderLoading = () => render(<Loading />);

describe('<Loading />', () => {
  it('renders Loading correctly', () => {
    const { getByText } = renderLoading();

    const text = getByText(loading);
    expect(text).toBeInTheDocument();
  });
});
