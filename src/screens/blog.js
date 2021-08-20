import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Row, Button } from 'react-bootstrap';
import { articleData } from '../database/articles';
import Footer from '../components/footer';

export default function Blog() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (articleData.length > 0) {
            setArticles(articleData)
        }
    }, []);

    return (
        <>
            <Row className="p-3 px mx-2 d-flex justify-content-center">
                {articles.map((article, i) => {
                    return (
                        <Card className="curved mx-lg-5 my-3 border-1 d-flex align-items-center font-style" key={i} style={{ width: "20rem", height: "23rem" }}>
                            <a className="link-dark removeline" href={article.url}>
                                <Card.Img className="curved mt-3" variant="top" style={{ height: "10rem" }} src={article.image}>
                                </Card.Img>
                                <Card.Body>
                                    <Card.Title className="w-100">{article.title}</Card.Title>
                                    <Card.Text className="cardtext">{article.text}</Card.Text>
                                    <Row className="d-flex justify-content-end mr-1">
                                        <Button variant="primary" className="w-25">Read</Button>
                                    </Row>
                                </Card.Body>
                            </a>
                        </Card>
                    );
                })}
            </Row>
            <Footer />
        </>
    )
}