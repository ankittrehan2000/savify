import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { BsExclamationCircle } from 'react-icons/bs';
import { Row, Col } from 'react-bootstrap';

export default function calculateThresholds(entries, daySpend) {
    const spendPct = daySpend * 100 / entries.maxSpend;
    let threshold;
    let icon;
    if (spendPct > entries.threshhold) {
        threshold = `You are past your reminder threshold, you have spent ${(spendPct).toFixed(2)}% of your daily limit`;
        icon = <FiThumbsDown color="red" style={{ height: "2rem", width: "2rem" }} />;
    } else if (spendPct > (entries.threshhold - 10)) {
        threshold = `You are about to reach your daily threshold, you have spent ${(spendPct).toFixed(2)}% of your daily limit`;
        icon = <BsExclamationCircle color="blue" style={{ height: "2rem", width: "2rem" }} />
    } else {
        threshold = `You are well within your threshold, you have spent ${(spendPct).toFixed(2)}% of your daily limit`;
        icon = <FiThumbsUp color="green" style={{ height: "2rem", width: "2rem" }} />
    }

    return (
        <Row className="d-flex justify-content-center my-4">
            <Col lg={1}>
                {icon}
            </Col>
            <Col lg={7}>
                <h6 className="font-style">{threshold}</h6>
            </Col>
        </Row>
    )
}