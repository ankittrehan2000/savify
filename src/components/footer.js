import React from 'react';
import { Navbar, Row } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="mt-5">
            <Navbar className="bottomNav">
            <Row className="d-flex justify-content-center align-items-center font-style p-2" style={{backgroundColor: "#588b76"}}>
                <h4>Ankit Trehan: Savify ©</h4>
            </Row>
            </Navbar>
        </footer>
    );
}