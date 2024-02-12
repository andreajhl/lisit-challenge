import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import './styles.scss';

const MAX_ITEMS_PAGINATION = 3;

const Pagination = ({ availablePages, currentPage = 0, setCurrentPage }) => {
  const isFirstPage = useMemo(() => currentPage - 1 < 0, [currentPage]);
  const isLastPage = useMemo(() => currentPage + 1 >= availablePages, [currentPage])

  const [visiblePages, setVisiblePages] = useState([]);

  const updateVisiblePages = (page) => {
    if (page >= availablePages) return;

    const allPages = Array.from({ length: availablePages }, (_, index) => index);
    setVisiblePages(allPages.slice(page, page + MAX_ITEMS_PAGINATION));
  };

  const goToPage = (page) => () => setCurrentPage(page);
  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    const lastPage = visiblePages[visiblePages.length - 1];

    if (nextPage > availablePages) return;
    if (nextPage > lastPage) updateVisiblePages(nextPage);
    setCurrentPage(nextPage);
  };
  const goToPreviousPage = () => {
    const cutPoint = currentPage - MAX_ITEMS_PAGINATION;
    const previousPage = currentPage - 1;
    const firstPage = visiblePages[0];

    if (previousPage < 0) return;
    if (previousPage < firstPage ) updateVisiblePages(cutPoint >= 0 ? cutPoint : 0);
    setCurrentPage(previousPage);
  };

  useEffect(() => { updateVisiblePages(currentPage) }, [availablePages]);

  return (
    <div className='pagination'>
      <button
        aria-label='previous page'
        onClick={goToPreviousPage}
        disabled={isFirstPage}
        className={classNames(
          'pagination__button',
          { disabled: isFirstPage }
        )}
      >
        <span aria-hidden='true'>&laquo;</span>
      </button>
      {
        visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            aria-label={`page ${pageNumber}`}
            onClick={goToPage(pageNumber)}
            className={classNames(
              'pagination__button',
              { 'active-link': currentPage === pageNumber }
            )}
          >
            {pageNumber + 1}
          </button>
        ))
      }
      <button 
        aria-label='next page'
        onClick={goToNextPage}
        disabled={isLastPage}
        className={classNames(
          'pagination__button',
          { disabled: isLastPage }
        )}
      >
        <span aria-hidden='true'>&raquo;</span>
      </button>
    </div>
  );
};

export default Pagination;
