// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import Footer from './components/Footer';
import MovieDetail from './components/MovieDetail';
import moviesData from './data/movies.json';
import Banner from './components/Banner';

const App = () => {
  const [filteredMovies, setFilteredMovies] = useState(moviesData);
  const [theme, setTheme] = useState('light'); // State for theme

  // Load the theme from localStorage when the app first mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme; // Apply the saved theme to the body
  }, []);

  const handleSearch = (query) => {
    const filtered = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save the new theme in localStorage
    document.body.className = newTheme; // Apply the new theme to the body
  };

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} /> {/* Pass theme state and toggle function */}
         <Banner className="banner-spacing" />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <main>
          <Routes>
            <Route path="/" element={<MovieList movies={filteredMovies} />} />
            <Route path="/genre/:genre" element={<MovieList movies={filteredMovies} />} />
            <Route path="/country/:country" element={<MovieList movies={filteredMovies} />} />
            <Route path="/year/:year" element={<MovieList movies={filteredMovies} />} />
            <Route path="/movie/:id" element={<MovieDetail movies={moviesData} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
