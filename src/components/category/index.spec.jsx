import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams, useLoaderData } from 'react-router-dom';
import { vi } from 'vitest';
import wordings from '../../wordings';
import { getCategory } from '../../client';
import { useQueryParams } from '../../hooks/useQueryParams';
import Category from '.';

vi.mock('../../client');
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
  pages: 2,
  list: [
    { id: 1, name: 'Category 1', films: 3 },
    { id: 2, name: 'Category 2', films: 5 }
  ],
};

beforeEach(() => {
  useLoaderData.mockReturnValue(mockCategoryData);
  useParams.mockReturnValue({ category: 'people' });
  useQueryParams.mockReturnValue({ querys: {}, setQuery: vi.fn() });
});

afterEach(() => { vi.clearAllMocks(); });

describe('<Category />', () => {
  it('renders empty state when category list is empty', async () => {
    useQueryParams.mockReturnValue({ querys: { search: 'test' }, setQuery: vi.fn() });
    getCategory.mockResolvedValueOnce({ results: [], count: 0 });

    const { getByText } = renderCategory();

    await waitFor(() => {
      const emptyStateText = getByText(empty.title);
      expect(emptyStateText).toBeInTheDocument();
    });
  });

  it('renders category list when category list is not empty', async () => {
    const { getByText } = renderCategory();

    const categoryItem1 = getByText('Category 1');
    const categoryItem2 = getByText('Category 2');

    expect(categoryItem1).toBeInTheDocument();
    expect(categoryItem2).toBeInTheDocument();
  });

  it('renders alert when an error occurs while fetching category data', async () => {
    useQueryParams.mockReturnValue({ querys: { search: 'test' }, setQuery: vi.fn() });
    getCategory.mockRejectedValueOnce(new Error());

    const { getByRole } = renderCategory();

    await waitFor(async () => {
      const errorAlert = getByRole('alert');
      expect(errorAlert).toBeInTheDocument();
    });
  });
});
