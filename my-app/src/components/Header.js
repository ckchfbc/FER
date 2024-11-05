import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import movies from '../data/movies.json';
import Login from './Login';
import ThemeToggle from './ThemeToggle';

const Header = ({ onSearch, toggleTheme, isDarkTheme }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [years, setYears] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const uniqueGenres = Array.from(new Set(movies.map((movie) => movie.genre)));
    const uniqueCountries = Array.from(new Set(movies.map((movie) => movie.country)));
    const uniqueYears = Array.from(new Set(movies.map((movie) => movie.year))).sort((a, b) => a - b);
    setGenres(uniqueGenres);
    setCountries(uniqueCountries);
    setYears(uniqueYears);
  }, []);

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleSelect = (type, value) => {
    navigate(`/${type}/${value}`);
    setActiveDropdown(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
  };

  const handleLoginShow = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    handleLoginClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  // Helper function to chunk the years into groups of 5
  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const yearChunks = chunkArray(years, 5);

  return (
    <Navbar bg={isDarkTheme ? 'dark' : 'light'} variant={isDarkTheme ? 'dark' : 'light'} expand="lg" className="w-100">
      <Container>
        <Navbar.Brand href="/">
          <div className="logo-container">
            <img
              src='/img/logo.jpg'
              alt="React Movie Web Logo"
              style={{ height: '40px', width: 'auto' }}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="nav-link">Phim Mới</Nav.Link>
            <Nav.Link href="#movies" className="nav-link">Phim Lẻ</Nav.Link>
            <Nav.Link href="#series" className="nav-link">Phim Bộ</Nav.Link>

            <NavDropdown
              title="Thể loại"
              id="genre-dropdown"
              show={activeDropdown === 'genre'}
              onToggle={() => handleDropdownToggle('genre')}
            >
              {genres.map((genre) => (
                <NavDropdown.Item key={genre} onClick={() => handleSelect('genre', genre)}>
                  {genre}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown
              title="Quốc gia"
              id="country-dropdown"
              show={activeDropdown === 'country'}
              onToggle={() => handleDropdownToggle('country')}
            >
              {countries.map((country) => (
                <NavDropdown.Item key={country} onClick={() => handleSelect('country', country)}>
                  {country}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown
              title="Năm phát hành"
              id="year-dropdown"
              show={activeDropdown === 'year'}
              onToggle={() => handleDropdownToggle('year')}
            >
              <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="d-flex flex-column">
                {years.map((year, index) => (
                  <NavDropdown.Item
                    key={year}
                    onClick={() => handleSelect('year', year)}
                    className="m-1" // Add margin for spacing
                    style={{ flex: '0 0 20%' }} // Each item will take 20% of the container's width
                  >
                    {year}
                  </NavDropdown.Item>
                ))}
              </div>
            </NavDropdown>




          </Nav>

          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Tìm phim..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>

          <ThemeToggle isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />

          {isLoggedIn ? (
            <>
              <span className="ms-3">Hello, {username}!</span>
              <Button variant="outline-danger" onClick={handleLogout} className="ms-3">
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline-primary" onClick={handleLoginShow} className="ms-3">
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>

      <Login show={showLogin} handleClose={handleLoginClose} onLoginSuccess={handleLoginSuccess} />
    </Navbar>
  );
};

export default Header;
