import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import {BsExclamationCircle} from 'react-icons/bs';

export default function provideInsights(entries, monthlyVal) {
    let pastMonth = new Date();
    pastMonth.setMonth(pastMonth.getMonth() - 1);
    let data = []
    entries.map(entry => {
        if (pastMonth.getTime() < new Date(entry.date).getTime()) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].category === entry.category) {
                    data[i].value += entry.price;
                    data[i].num += 1;
                    return null;
                }
            }
            data.push({
                category: entry.category,
                value: entry.price,
                num: 1
            });
            return null;
        };
    });
    let maxSpendVal = { value: 0 };
    let leastSpendVal = { value: Infinity };
    let mostTransactions = { num: 0 };
    for (let i = 0; i < data.length; i++) {
        if (maxSpendVal.value < data[i].value) {
            maxSpendVal = data[i];
        }
        if (leastSpendVal.value > data[i].value) {
            leastSpendVal = data[i];
        }
        if (mostTransactions.num < data[i].num) {
            mostTransactions = data[i];
        }
    }
    return (
        <Row className="justify-content-center d-flex font-style">
            <Col lg={6} md={8} sm={12} className="font-style d-flex justify-content-start my-3">
                <h4>Insights of your monthly expenses:</h4>
            </Col>
            <Col lg={9} md={8} sm={12} className="font-style">
                <Row className="d-flex justify-content-center my-1">
                    <Col lg={1} sm={1}>
                    <FiThumbsUp color="green" style={{ height: "2rem", width: "2rem" }}/>
                    </Col>
                    <Col lg={8} sm={4} className="d-flex justify-content-start align-items-center">
                    <p>You have spent least money in the {leastSpendVal.category} category, totaling {(leastSpendVal.value * 100 / monthlyVal).toFixed(2)}%</p>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center my-1">
                    <Col lg={1}>
                    <BsExclamationCircle color="blue" style={{ height: "2rem", width: "2rem" }}/>
                    </Col>
                    <Col lg={8} className="d-flex justify-content-start align-items-center">
                    <p>The most transactions that you did were from {mostTransactions.category} category, you had {mostTransactions.num} transaction(s) in this category</p>                    </Col>
                </Row>
                <Row className="d-flex justify-content-center my-1">
                    <Col lg={1}>
                    <FiThumbsDown color="red" style={{ height: "2rem", width: "2rem" }}/>
                    </Col>
                    <Col lg={8} className="d-flex justify-content-start align-items-center">
                    <p>You have spent most money in the {maxSpendVal.category} category, totaling {(maxSpendVal.value * 100 / monthlyVal).toFixed(2)}%</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
