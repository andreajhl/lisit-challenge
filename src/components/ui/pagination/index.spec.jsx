
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import Pagination from '.';

const tenPagesAvailable = 10;
const threePagesAvailable = 3;

const setCurrentPage = vi.fn();
const renderPagination = (pages = tenPagesAvailable) => (
  render(
    <Pagination
      availablePages={pages}
      setCurrentPage={setCurrentPage}
    />
  )
);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('<Pagination />', () => {
  it('renders pagination correctly', () => {
    const { container } = renderPagination();

    const pagination = container.querySelector('.pagination');
    expect(pagination).toBeDefined();
  });

  it('clicking on a page button navigates correctly', () => {
    const { getAllByRole } = renderPagination();

    const pageButtons = getAllByRole('button');
    expect(pageButtons).toHaveLength(5);

    fireEvent.click(pageButtons[2]);
    expect(setCurrentPage).toHaveBeenCalled();
  });

  it('when the maximum number of available pages is reached, disable the button', () => {
    const onePagesAvailable = 1;
    const { getByRole } = renderPagination(onePagesAvailable);

    const nextButton = getByRole('button', { name: 'next page' });

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(setCurrentPage).toHaveBeenCalledTimes(0);
  });

  it('when the min number of zero is reached, disable the button', () => {
    const { getByRole } = renderPagination(threePagesAvailable);

    const nextButton = getByRole('button', { name: 'next page' });
    const prevButton = getByRole('button', { name: 'previous page' });

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    expect(setCurrentPage).toHaveBeenCalledTimes(2);
  });
});