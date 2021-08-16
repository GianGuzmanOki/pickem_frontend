import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginate({ defaultActivePage, totalPages, onPageChange }) {
  const [activePage, setActivePage] = useState(defaultActivePage);

  const handleFirstClick = () => {
    onPageChange(1);
    setActivePage(1);
  };

  const handlePreviousClick = () => {
    if (activePage > 1) {
      onPageChange(activePage - 1);
      setActivePage(activePage - 1);
    }
  };

  const handleNextClick = () => {
    if (activePage < totalPages) {
      onPageChange(activePage + 1);
      setActivePage(activePage + 1);
    }
  };

  const handleLastClick = () => {
    onPageChange(totalPages);
    setActivePage(totalPages);
  };

  const handlePageClick = (pageSelected) => {
    onPageChange(pageSelected);
    setActivePage(pageSelected);
  };

  // create helper array to map page items
  const pagesArray = Array.from(Array(totalPages).keys());

  return (
    <Pagination>
      <Pagination.First onClick={handleFirstClick} />
      <Pagination.Prev onClick={handlePreviousClick} />

      {pagesArray.map((_, index) => (
        <Pagination.Item
          active={activePage === index + 1}
          key={index}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next onClick={handleNextClick} />
      <Pagination.Last onClick={handleLastClick} />
    </Pagination>
  );
}

export default Paginate;
