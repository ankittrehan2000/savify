import React from 'react';
import { useState } from 'react';
import { Container, NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../authentication/authContext';

export default function TopNavbar() {
    const { currentUser } = useAuth();

    return (
        <Navbar expand="lg" className="p-sm-5 p-lg-4 font-style navbar">
            <Container className="container-fluid">
                <Navbar.Brand href="/">Savify</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{
                        backgroundColor: "#588b76",
                    }} className="ms-auto">
                        {currentUser && <Nav.Link href="/">Home</Nav.Link>}
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        {!currentUser ? (
                            <Nav.Link href="/login">Log In</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link href="/settings">Settings</Nav.Link>
                                <Nav.Link href="/">Hi, {currentUser.email}</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}