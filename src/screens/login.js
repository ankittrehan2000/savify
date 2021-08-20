import React from 'react';
import { useRef, useState } from 'react';
import { Card, Form, Button, Col, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../authentication/authContext';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();

    async function handleSubmit(e) {
        //prevent for refresh
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {
            return setError('Failed to sign in');
        }
        setLoading(false);
        history.push("/");
        return;
    }

    return (
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }} className="mt-5">
            <Card className="shadow rounded">
                <Card.Body className="p-lg-5 p-md-2 p-sm-0 font-style">
                    <h2 className="text-center mb-4 w-400">Log in</h2>
                    {error && <Alert variant="danger" className="my-3 w-100">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="m-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="m-2 mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">
                            Log in
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-4">
                        Haven't saved yet? <Link to="/signup">Sign Up</Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}