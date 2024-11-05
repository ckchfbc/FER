import React from 'react';
import { useParams } from 'react-router-dom';
import moviesData from '../data/movies.json';
import MovieList from './MovieList';

const GenreMovies = () => {
  const { genreName } = useParams(); // Lấy thể loại từ URL
  const filteredMovies = moviesData.filter((movie) => movie.genre === genreName);

  return (
    <div>
      <h2>Phim thuộc thể loại: {genreName}</h2>
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default GenreMovies;
