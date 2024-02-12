import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import wordings from '../../wordings'
import NotFound from '.';

const { notFound: { title } } = wordings;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(() => ({
      response: { status: 500 },
    })),
  }
})

const renderNotFound = () => render(<NotFound />, { wrapper: BrowserRouter });

describe('<NotFound />', () => {
  it('basic render', () => {
    const { getByText } = renderNotFound();
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(500)).toBeInTheDocument();
  });

  it('shows a link to navigate to the base URL', () => {
    const { getByRole } = renderNotFound();

    const link = getByRole('link', { name: /Return/ });
    expect(link.getAttribute('href')).toBe('/');
  });
});
