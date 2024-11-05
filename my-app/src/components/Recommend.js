// src/components/Recommend.js
import React, { useState } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import MovieCard from './MovieCard';

const Recommend = ({ movies, genre, currentMovieId }) => {
    // Filter movies by the same genre, excluding the current movie
    const filteredMovies = movies.filter(
        (movie) => movie.genre === genre && movie.id !== currentMovieId
    );

    // State to track the current page
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 3;

    // Calculate total pages
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    // Get the movies to display on the current page
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = filteredMovies.slice(startIndex, startIndex + moviesPerPage);

    // Function to change the page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mt-4">
                  <strong><h4 style={{ color: 'red', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>Movies List</h4></strong>
            <Row>
                {currentMovies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>

            {/* Pagination Controls */}
            <Pagination className="justify-content-center mt-3">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default Recommend;
