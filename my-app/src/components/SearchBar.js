import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Container, Alert } from 'react-bootstrap';
import moviesData from '../data/movies.json'; // Import the JSON data
import MovieList from './MovieList'; // Ensure this component is correctly imported

const SearchBar = () => {
  const [movies, setMovies] = useState([]); // Original list of movies
  const [filteredMovies, setFilteredMovies] = useState([]); // Filtered list
  const [notFoundMessage, setNotFoundMessage] = useState(''); // Message for no results

  // Load the JSON data on component mount
  useEffect(() => {
    setMovies(moviesData);
    setFilteredMovies(moviesData); // Initially display all movies
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value.trim().toLowerCase();

    const result = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );

    setFilteredMovies(result); // Update filtered movies list

    // Update the not found message based on the result
    if (result.length === 0) {
      setNotFoundMessage('Không tìm thấy phim này'); // No movies found message
    } else {
      setNotFoundMessage(''); // Clear the message if movies are found
    }
  };

  return (
    <Container className="my-4">
      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="d-flex">
        <FormControl
          type="search"
          placeholder="Search for a movie..."
          className="me-2 search-bar" // Apply CSS class for the search bar
          name="search"
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>

      {/* Display filtered movies */}
      <MovieList movies={filteredMovies} />

      {/* Display not found message if applicable */}
      {notFoundMessage && (
        <Alert variant="warning" className="mt-3">
          {notFoundMessage}
        </Alert>
      )}
    </Container>
  );
};

export default SearchBar;
