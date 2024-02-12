import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import wordings from '../../wordings';
import CategoryDetails from '.';

const {
  details: {
    characteristics: { episode },
    additional: { films },
  },
} = wordings;
const mockLoaderData = {
  title: 'title',
  subtitle: 'subtitle',
  characteristics: { episode: 'episode 1' },
  additionalInformation: {
    films: [
      { id: '1', name: 'films 1' },
      { id: '2', name: 'films 1' }
    ],
  },
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useLoaderData: vi.fn(() => mockLoaderData) }
});

const renderCategoryDetail = () => (
  render(
    <MemoryRouter>
      <CategoryDetails />
    </MemoryRouter>
  )
);

describe('CategoryDetails', () => {
  test('renders category details correctly', () => {
    const { getByText } = renderCategoryDetail();

    const title = getByText(mockLoaderData.title);
    expect(title).toBeInTheDocument();

    const subtitle = getByText(mockLoaderData.subtitle);
    expect(subtitle).toBeInTheDocument();

    const characteristicName = getByText(episode);
    expect(characteristicName).toBeInTheDocument();

    const characteristicValue = getByText(
      mockLoaderData.characteristics.episode
    );
    expect(characteristicValue).toBeInTheDocument();
  });

  test('renders links of additional information to be able to navigate', () => {
    const { getByText, getAllByRole } = renderCategoryDetail();
    const additionalInfo = mockLoaderData.additionalInformation.films;

    const additionalInfoName = getByText(films);
    expect(additionalInfoName).toBeInTheDocument();

    const additionalInfoLinks = getAllByRole('link');
    additionalInfoLinks.forEach((link, index) => {
      const { id } = additionalInfo[index];
      expect(link).toHaveAttribute('href', `/films/${id}`);
    });
  });
});
