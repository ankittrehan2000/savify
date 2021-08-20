import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Table, Row, Col, Modal, FormLabel, FormGroup, Button, Form, Accordion } from 'react-bootstrap';
import { useAuth } from '../authentication/authContext';
import createCharts from '../functions/createCharts';
import createTable from '../functions/createTable';
import provideInsights from '../functions/provideInsights';
import db from '../database/setUpDb';
import 'firebase/database';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';
import Footer from '../components/footer';
import calculateThresholds from '../functions/calculateThresh';
import calculateDaySpend from '../functions/daySpend';
import calculateMonthSpend from '../functions/monthSpend';

const skeleton = {
    entries: [],
    notifPref: "",
    threshhold: 50,
    maxSpend: 100,
}

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [entries, setEntries] = useState(skeleton);
    const [showModal, setShowModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [monthSpend, setMonthSpend] = useState(0);
    const [showError, setShowError] = useState(false);
    const [daySpend, setDaySpend] = useState(0);
    const objectType = useRef();
    const priceVal = useRef();
    const categoryVal = useRef();
    let iter = 0;

    useEffect(() => {
        db.ref('users/' + currentUser.uid).on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setEntries(snapshot.val());
            }
        });
        calculateTotals();
    }, []);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => { setShowError(false); setShowModal(false); }
    const handleShowModalClose = () => setShowSaveModal(false);

    const addToEntries = () => {
        if (objectType.current.value.length === 0 ||
            priceVal.current.value === 0 ||
            categoryVal.current.value.length === 0) {
            setShowError(true);
            return;
        }
        const newEntry = {
            name: objectType.current.value,
            price: parseInt(priceVal.current.value),
            date: new Date().getTime(),
            category: categoryVal.current.value,
        };
        entries.entries.push(newEntry);
        setEntries(entries);
        setShowError(false);
        handleClose();
        calculateTotals();
        createCharts(entries);
    }

    const handleDelete = (i) => {
        entries.entries.splice(i, 1);
        setEntries({
            entries: entries.entries,
            notifPref: entries.notifPref,
            threshhold: entries.threshhold,
            maxSpend: entries.maxSpend,
        });
        calculateTotals();
        createCharts(entries);
    }

    const calculateTotals = () => {
        let pastMonth = new Date();
        pastMonth.setMonth(pastMonth.getMonth() - 1);
        let total = 0;
        let dayTot = 0
        entries.entries.map(entry => {
            if (new Date().toLocaleDateString() == new Date(parseInt(entry.date)).toLocaleDateString()) {
                dayTot += entry.price;
                total += entry.price;
            }
            else if (pastMonth.getTime() < new Date(parseInt(entry.date)).getTime()) {
                total += entry.price;
            }
        });
        setMonthSpend(total);
        setDaySpend(dayTot);
        return daySpend;
    }

    const writeToDb = () => {
        /* to write */
        db.ref('users/' + currentUser.uid).set(entries);
        setShowSaveModal(true);
    }

    return (
        <div>
            <div className="w-100">
                <div className="d-flex justify-content-center">
                    <Col sm={12} md={8} lg={8}>
                        <Table responsive className="expandtable font-style">
                            <thead>
                                <tr>
                                    <th>Entry Number</th>
                                    <th>Item Name</th>
                                    <th>Cost</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.entries.length > 0 && entries.entries.map((entry, i) => {
                                    if (new Date(parseInt(entry.date)).toLocaleDateString() == new Date().toLocaleDateString()) {
                                        iter++;
                                        return (
                                            <tr key={i}>
                                                <td>{iter}</td>
                                                <td>{entry.name}</td>
                                                <td>{entry.price}</td>
                                                <td>{entry.category}</td>
                                                <td><a onClick={() => handleDelete(i)}><BsFillTrashFill color="red" style={{ height: "2rem", width: "1.5rem" }} className="icon-class"></BsFillTrashFill></a></td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </Table>
                        {iter === 0 && <p className="text-center font-style m-5 text-secondary">Add today's entries</p>}
                        <Row className="d-flex justify-content-between align-items-center px-4">
                            <AiFillPlusCircle className="mt-3 icon-class" color="green" style={{ height: "4rem", width: "4rem" }} onClick={handleOpen}>
                            </AiFillPlusCircle>
                            <Button onClick={writeToDb} style={{ width: "17%", height: "2.5rem" }}>Save</Button>
                        </Row>
                        {entries.entries.length > 0 && calculateThresholds(entries, calculateDaySpend(entries))}
                        <Modal centered show={showModal} onHide={handleClose} className="font-style">
                            <Modal.Header closeButton>
                                <Modal.Title>Add a new entry</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <FormGroup>
                                        <FormLabel>Object you spent on</FormLabel>
                                        <Form.Control ref={objectType} required placeholder="Coffee"></Form.Control>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Amount</FormLabel>
                                        <Form.Control ref={priceVal} required placeholder="50" type="number"></Form.Control>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel>Category</FormLabel>
                                        <Form.Control ref={categoryVal} required placeholder="Food"></Form.Control>
                                    </FormGroup>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                {showError && <h6 className="text-danger">Please enter correct input</h6>}
                                <Button onClick={handleClose}>Close</Button>
                                <Button type="submit" onClick={addToEntries}>Add</Button>
                            </Modal.Footer>
                        </Modal>
                        <hr
                            style={{
                                color: "black",
                                backgroundColor: "black",
                                height: 2,
                                width: "100%"
                            }}
                        />
                        <Modal centered show={showSaveModal} onHide={handleShowModalClose} className="font-style">
                            <Modal.Header closeButton>
                                <Modal.Title>Entry Saved Successfully</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button onClick={handleShowModalClose}>Okay</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </div>
                <Row className="justify-content-center d-flex mt-3">
                    <Col lg={6} md={8} sm={12} className="font-style d-flex justify-content-between p-3">
                        <h4>Monthly Spend: </h4>
                        <h4>${calculateMonthSpend(entries)}</h4>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center p-3">
                    <Accordion className="w-50">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>All Transaction History</Accordion.Header>
                            <Accordion.Body>
                                {createTable(entries)}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <hr
                    style={{
                        color: "black",
                        backgroundColor: "black",
                        height: 2,
                        width: "70%",
                        marginLeft: "15%",
                    }}
                />
                {entries.entries.length > 0 && (
                    <>
                        <Row className="justify-content-center d-flex">
                            <Col lg={6} md={8} sm={12} className="font-style d-flex justify-content-start p-3">
                                <h4>Visualization of your total spending: </h4>
                            </Col>
                        </Row>
                        {entries.entries.length > 0 && createCharts(entries)}
                        <hr
                            style={{
                                color: "black",
                                backgroundColor: "black",
                                height: 2,
                                width: "70%",
                                marginLeft: "15%",
                            }}
                        />
                        {entries.entries.length > 0 && provideInsights(entries.entries, calculateMonthSpend(entries))}
                        <Footer />
                    </>
                )}
            </div>

        </div>
    )
}
