// src/components/MovieList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import Fireworks from './Fireworks';
import { Pagination, Row, Col, Container, Alert } from 'react-bootstrap';

const MovieList = ({ movies }) => {
  const { genre, country, year } = useParams();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    let filtered = movies;
    if (genre) filtered = filtered.filter((movie) => movie.genre === genre);
    if (country) filtered = filtered.filter((movie) => movie.country === country);
    if (year) filtered = filtered.filter((movie) => movie.year.toString() === year);

    setFilteredMovies(filtered);
  }, [genre, country, year, movies]);

  const moviesPerPage = 6;
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setShowFireworks(true);

    // Hide fireworks after a short delay (e.g., 3 seconds)
    setTimeout(() => setShowFireworks(false), 3000);
  };

  return (
    <Container className="movie-list-container">
      <strong><h1 style={{ color: 'red', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>Movies List</h1></strong>
      {showFireworks && <Fireworks width={window.innerWidth} height={window.innerHeight} isVisible={showFireworks} />}
      <Row className="mt-4">
        {filteredMovies.length === 0 ? (
          <Col xs={12}>
            <Alert variant="warning" className="text-center">
              Không tìm thấy phim nào
            </Alert>
          </Col>
        ) : (
          filteredMovies
            .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
            .map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} className="d-flex align-items-stretch mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))
        )}
      </Row>
      <Pagination className="justify-content-center mt-4">
        {totalPages > 1 && (
          <>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </>
        )}
      </Pagination>
    </Container>
  );
};

export default MovieList;
