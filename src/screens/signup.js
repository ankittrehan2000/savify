import React from 'react';
import { useRef, useState } from 'react';
import { Card, Form, Button, Col, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../authentication/authContext';

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();

    async function handleSubmit(e) {
        //prevent for refresh
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        } else if (passwordRef.current.value.length < 6) {
            return setError('Password length should be at least 6 characters');
        }
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
        } catch {
            return setError('Error while trying to create user');
        }
        setLoading(false);
        history.push("/");
        return;
    }

    return (
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }} className="mt-5">
            <Card className="shadow rounded">
                <Card.Body className="p-lg-5 p-md-2 p-sm-0 font-style">
                    <h2 className="text-center mb-4 w-400">Sign Up</h2>
                    {error && <Alert variant="danger" className="my-3 w-100">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="m-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="m-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-reenter" className="mb-3 m-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-4">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}