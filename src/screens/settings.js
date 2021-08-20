import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../authentication/authContext';
import db from '../database/setUpDb';

export default function Settings() {
    const { currentUser } = useAuth();
    const threshold = useRef();
    const maxSpend = useRef();
    const [entries, setEntries] = useState({ maxSpend: 0, threshhold: 0 });
    const [saved, setSaved] = useState(false);

    const updateSettings = () => {
        setSaved(false);
        db.ref('users/' + currentUser.uid).update({
            maxSpend: maxSpend.current.value,
            threshhold: threshold.current.value
        });
        setSaved(true);
    }

    useEffect(() => {
        db.ref('users/' + currentUser.uid).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setEntries(snapshot.val());
            }
        });
    }, []);

    return (
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 4, offset: 4 }} className="mt-5">
            <Card className="rounded p-5">
                <Card.Body className="p-lg-5 p-md-2 p-sm-0 font-style">
                    <h2 className="text-center mb-4 w-400">Settings</h2>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group id="max" className="m-2">
                            <Form.Label>Daily Max Spending</Form.Label>
                            <Form.Control type="number" ref={maxSpend} required placeholder={entries.maxSpend} />
                        </Form.Group>
                        <Form.Group id="threshold" className="m-2 mb-3">
                            <Form.Label>Threshold Percentage</Form.Label>
                            <Form.Control type="number" ref={threshold} required placeholder={entries.threshhold}/>
                        </Form.Group>
                        <Button className="w-100 mt-5" type="submit" onClick={updateSettings}>
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            {saved && <Alert variant="success" className="text-center font-style mt-5">Item saved</Alert>}
        </Col>
    )
}