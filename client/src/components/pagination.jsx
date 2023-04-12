import React from 'react';

const Pagination = ({ currentPage, totalPages,filtroType, onPageChange,fetchPage }) => {

  const handlePageChange =async (pageNumber) => {
        onPageChange(pageNumber);
        await fetchPage(pageNumber);
    };
    return (
      <nav className="spin-pag">
        <ul className="pagination">
          <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1,filtroType)}
              disabled={currentPage === 1}
            >
              {'<<'}
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <li key={page} className={`page-item${currentPage === page ? "active current-page" : " "}`}>
              <button className="page-link" onClick={() => handlePageChange(page,filtroType)}>
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1,filtroType)}
              disabled={currentPage === totalPages}
            >
              {'>>'}
            </button>
          </li>
        </ul>
      </nav>
    );
  };
  
export default Pagination;
