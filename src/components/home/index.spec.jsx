import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import wordings from '../../wordings';
import { vi } from 'vitest';
import Home from '.';

const { home: { title, categories } } = wordings;

const categoryList = {
  people: { name: 'People' },
  planets: { name: 'Planets' },
  starships: { name: 'Starships' },
};

vi.mock('react-router-dom', async() => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useLoaderData: vi.fn(() => categoryList) };
});

const renderHome = () => (
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
);

describe('Home', () => {
  test('renders Home correctly', () => {
    const { getByText } = renderHome();
    expect(getByText(title)).toBeInTheDocument();
  });

  test('renders a link for each category', () => {
    const { getAllByRole, getByText } = renderHome();

    const categoryLinks = getAllByRole('link');
    const categoryKeys = Object.keys(categoryList);

    expect(categoryLinks).toHaveLength(categoryKeys.length);
  
    categoryLinks.forEach((link, index) => {
      const category = categoryKeys[index];

      expect(link).toHaveAttribute('href', `/category/${category}`);
      expect(getByText(categories[category])).toBeInTheDocument();
    });
  });
});
