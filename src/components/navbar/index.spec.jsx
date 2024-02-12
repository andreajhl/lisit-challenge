import { render } from '@testing-library/react';
import {
  useParams,
  useLocation,
  MemoryRouter,
  useSearchParams,
} from 'react-router-dom';
import wordings from '../../wordings';
import { vi } from 'vitest';
import Navbar from '.';

const { navbar: { placeholder, title } } = wordings;

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
  useLocation.mockReturnValue({ search: '' });
  useSearchParams.mockReturnValue([null, vi.fn()]);
});

const renderNavBar = () => render(
  <MemoryRouter>
    <Navbar />
  </MemoryRouter>
);

describe('Navbar', () => {
  test('renders Navbar with brand title', () => {
    useParams.mockReturnValue({})
    const { getByText } = renderNavBar();

    const brandTitle = getByText(title);
    expect(brandTitle).toBeInTheDocument();
  });

  test('renders Search component when category is provided', () => {
    useParams.mockReturnValue({ category: 'people' })
    const { getByPlaceholderText } = renderNavBar();

    const searchInput = getByPlaceholderText(placeholder, { exact: false });
    expect(searchInput).toBeInTheDocument();
  });
});
