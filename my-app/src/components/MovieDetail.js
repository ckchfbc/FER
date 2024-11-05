// src/components/MovieDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Recommend from './Recommend';
import '../App.css';

const MovieDetail = ({ movies }) => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const selectedMovie = movies.find((m) => m.id === parseInt(id));
        setMovie(selectedMovie);
    }, [id, movies]);

    if (!movie) return <p>Movie not found!</p>;

    // Function to render stars based on rating
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
        <Container className="movie-detail-container mt-5">
            <Row className="justify-content-center">
                <Col md={5} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Img variant="top" src={`/img/${movie.poster}`} className="movie-poster" />
                    </Card>
                </Col>
                <Col md={7}>
                    <Card className="p-4 shadow-sm">
                        <Card.Body>
                            <h2 className="movie-title">{movie.title}</h2>
                            <hr />
                            <Card.Text className="movie-details">
                                <strong>Year:</strong> {movie.year} <br />
                                <strong>Genre:</strong> {movie.genre} <br />
                                <strong>Country:</strong> {movie.country} <br />
                                <strong>Rating:</strong> 
                                <span style={{ color: '#ffc107', fontSize: '1.2em', marginLeft: '8px' }}>
                                    {renderStars(movie.rating)}
                                </span>
                            </Card.Text>
                            <hr />
                            <div className="trailer-container">
                                <h5>Trailer</h5>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${movie.trailerId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="movie-trailer"
                                ></iframe>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Add the Recommend component */}
            <Row className="mt-4">
                <Col>
                    <Recommend movies={movies} genre={movie.genre} currentMovieId={movie.id} />
                </Col>
            </Row>
        </Container>
    );
};

export default MovieDetail;
