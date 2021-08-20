import {
    PieChart, Pie, Tooltip, Cell, Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    BarChart, CartesianGrid, XAxis, YAxis, Bar, Legend
} from 'recharts';
import { Row, Col } from 'react-bootstrap';

export default function createCharts(entries) {
    const data = [];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    entries.entries.map((entry) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == entry.category) {
                return data[i].value += entry.price;
            }
        };
        data.push({
            name: entry.category,
            value: entry.price,
        });
    });
    return (
        <Row className="justify-content-center d-flex">
            <Col lg={3} md={8} sm={12} className="font-style d-flex justify-content-center">
                <PieChart width={300} height={300} className="ml-2">
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={data}
                        outerRadius={70}
                        fill="#588b76"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip></Tooltip>
                </PieChart>
            </Col>
            <Col lg={3} md={8} sm={12} className="font-style d-flex justify-content-center">
                <RadarChart outerRadius={70}
                    width={300}
                    height={300}
                    data={data}
                    isAnimationActive={true}
                    >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar
                        name="RadarChart"
                        dataKey="value"
                        stroke="#588b76"
                        fill="#588b76"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </Col>
            <Col lg={3} md={8} sm={12} className="font-style d-flex justify-content-center align-items-center">
                <BarChart width={300}
                    height={250}
                    data={data}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </Col>
        </Row>

    );
}