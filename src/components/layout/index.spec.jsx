import { render } from '@testing-library/react';
import {
  useParams,
  useLocation,
  MemoryRouter,
  useSearchParams,
} from 'react-router-dom';
import { vi } from 'vitest';
import Layout from '.';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useLocation: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

beforeEach(() => {
  useParams.mockReturnValue({})
  useLocation.mockReturnValue({ search: '' });
  useSearchParams.mockReturnValue([null, vi.fn()]);
});

const renderLayout = () => (
  render(
    <MemoryRouter>
      <Layout>
        <p>test</p>
      </Layout>
    </MemoryRouter>
  )
);

describe('<Layout />', () => {
  it('renders Layout correctly', () => {
    const { getByRole, getByText } = renderLayout();

    const text = getByText('test');
    const navbar = getByRole('navigation');

    expect(navbar).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
