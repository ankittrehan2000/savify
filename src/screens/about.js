import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Footer from '../components/footer';

export default function About() {
    return (
        <>
            <Row className="d-flex justify-content-center">
                <Image className="curved m-2" style={{ height: "25rem", width: "45rem" }} src="/assets/savify.jpeg"></Image>
            </Row>
            <Container className="d-flex font-style mt-5">
            <Row className="m-5 d-flex justify-content-center">
            <Col className="mx-2" sm={12} lg={5}>
                    <h2>What is savify?</h2>
                    <p className="text-secondary">Savify: the app to help you save money. It is an expense tracker application which helps people
                        who are trying to be spend cautious by tracking their transactions, showing interactive charts
                        and teaching financial literacy. You will be able to log in/sign up and
                        their data will be stored in the backend, this will allow them to access the service from
                        anywhere and at any time. </p>
                    <p className="text-secondary">The web application will show you charts and tables about the
                        sectors in which they are spending to help them visualize where their money is going. Savify
                        will also allow you to set a spending limit and every time the spending limit is reached or a
                        certain threshold to the limit is reached, the app will notify you</p>
                </Col>
                <Col className="mx-2" sm={12} lg={5}>
                    <h2>How does it work?</h2>
                    <p className="text-secondary">Savify is an app that allows you to enter your daily expenses and shows your daily spending. In order to see your transactions you must login/signup for the service. After logging on the UI is very intuitive and you can add/remove entries</p>
                    <p className="text-secondary">You can see three different charts which help you visualize your spending and also set your daily spending limit with threshold for notifications</p>
                    <p className="text-secondary">The app also shows you a blog which helps you build up financial literacy which provides resources in order to give you a long term plan for your savings</p>
                </Col>
            </Row>
        </Container>
        <Footer></Footer>
        </>
    )
}
