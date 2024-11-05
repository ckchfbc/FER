// src/components/Login.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Login = ({ show, handleClose, onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [isRegistering, setIsRegistering] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            if (credentials.password !== credentials.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            alert(`Registered as: ${credentials.username}`);
        } else {
            alert(`Logged in as: ${credentials.username}`);
            onLoginSuccess(credentials.username); // Call onLoginSuccess with the username
        }
        handleClose();
        setCredentials({ username: '', password: '', confirmPassword: '' });
    };

    const toggleRegister = () => {
        setIsRegistering(!isRegistering);
        setCredentials({ username: '', password: '', confirmPassword: '' });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isRegistering ? 'Register' : 'Login'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {isRegistering && (
                        <Form.Group controlId="formConfirmPassword" className="mt-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={credentials.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    )}

                    <Button variant="primary" type="submit" className="mt-3">
                        {isRegistering ? 'Register' : 'Login'}
                    </Button>
                </Form>

                <div className="mt-3 text-center">
                    <Button variant="link" onClick={toggleRegister}>
                        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Login;
