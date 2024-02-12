import { vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams, useLoaderData } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import wordings from '../../wordings';
import Category from '.';

vi.mock('../../hooks/useQueryParams');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useLoaderData: vi.fn(),
  };
});

const renderCategory = () => (
  render(
    <MemoryRouter>
      <Category />
    </MemoryRouter>
  )
);

const { warnings: { empty } } = wordings;
const mockCategoryData = {
  data: {
    pages: 4,
    list: [
      { id: 1, name: 'Category 1', films: 3 },
      { id: 2, name: 'Category 2', films: 5 }
    ],
  },
  previuos: null
};

beforeEach(() => {
  useLoaderData.mockReturnValue(mockCategoryData);
  useParams.mockReturnValue({ category: 'people' });
  useQueryParams.mockReturnValue({ querys: { pages: 1 }, setQuery: vi.fn() });
});

afterEach(() => { vi.clearAllMocks(); });

describe('<Category />', () => {
  it('renders empty state when category list is empty', async () => {
    useLoaderData.mockReturnValue({ data: { list: [], pages: 0 }, previuos: true });
    const { getByText } = renderCategory();

    await waitFor(() => {
      const emptyStateText = getByText(empty.title);
      expect(emptyStateText).toBeInTheDocument();      
    });
  });

  it('renders category list when category list is not empty', async () => {
    const { getByText } = renderCategory();

    await waitFor(() => {
      const categoryItem1 = getByText('Category 1');
      const categoryItem2 = getByText('Category 2');

      expect(categoryItem1).toBeInTheDocument();
      expect(categoryItem2).toBeInTheDocument();
    })
  });
});
