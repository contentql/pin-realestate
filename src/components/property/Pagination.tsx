"use client";
import Link from "next/link";
import React, { useState } from "react";

const Pagination = () => {
  const totalPages = 8; // Replace this with your actual total number of pages
  const [currentPage, setCurrentPage] = useState(2); // Initialize the current page state to 2 (or any other default active page)

  const handlePageClick = (page : any) => {
    setCurrentPage(page);
    // Here you can add additional logic to handle what happens when the user clicks on a page number.
    // For example, you can fetch data corresponding to the selected page from the server or update the URL.
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // You can set the maximum number of page numbers to show in the pagination

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const renderPageNumbers = generatePageNumbers().map((page) => (
    <li
      key={page}
      className={`page-item${page === currentPage ? " active" : ""}`}
    >
      <Link
        className="page-link pointer"
        href="#"
        onClick={() => handlePageClick(page)}
      >
        {page}
      </Link>
    </li>
  ));


  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className="page-item">
          <Link
            className="page-link pointer"
            href="#"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <span className="fas fa-angle-left" />
          </Link>
        </li>
        {renderPageNumbers}
        <li className="page-item pointer">
          <Link
            className="page-link"
            href="#"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            <span className="fas fa-angle-right" />
          </Link>
        </li>
      </ul>
      <p className="mt10 pagination_page_count text-center">
        1-8 of 300+ property available
      </p>
    </div>
  );
};

export default Pagination;