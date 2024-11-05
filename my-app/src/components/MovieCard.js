// src/components/MovieCard.js
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaPlay, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  // Render stars based on the movie rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} color="#ffc107" />
        ))}
        {halfStar && <FaStarHalfAlt color="#ffc107" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} color="#ffc107" />
        ))}
      </>
    );
  };

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card
        className={`movie-card mb-4 d-flex flex-column ${hovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '18rem',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '15px',
          transition: 'transform 0.4s ease, box-shadow 0.4s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hovered
            ? '0 12px 20px rgba(0, 0, 0, 0.5)'
            : '0 4px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Card.Img
            variant="top"
            src={`/img/${movie.poster}`}
            style={{
              height: '300px',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: hovered ? 'scale(1.5)' : 'scale(1)',
              filter: hovered ? 'brightness(40%)' : 'brightness(100%)',
            }}
          />

          <div
            className={`play-button ${hovered ? 'visible' : ''}`}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
              borderRadius: '50%',
              width: '70px',
              height: '70px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s, transform 0.3s',
              opacity: hovered ? 1 : 0,
            }}
          >
            <FaPlay style={{ color: 'white', fontSize: '28px' }} />
          </div>
        </div>

        <Card.Body className="d-flex flex-column flex-grow-1">
          <Card.Title className="text-center fw-bold">{movie.title}</Card.Title>
          <Card.Text className="text-center text-muted mb-2">
            <strong>Năm:</strong> {movie.year} <br />
            <strong>Thể loại:</strong> {movie.genre} <br />
            <strong>Quốc gia:</strong> {movie.country}
          </Card.Text>
          <div className="text-center" style={{ color: '#ffc107', fontSize: '1.2em' }}>
            {renderStars(movie.rating)}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;
