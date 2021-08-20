import { Table } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
export default function createTable(entries) {
    return (
        <Table responsive className="expandtable font-style">
            <thead>
                <tr>
                    <th>Entry Number</th>
                    <th>Item Name</th>
                    <th>Cost</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {entries.entries.map((entry, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{entry.name}</td>
                            <td>{entry.price}</td>
                            <td>{entry.category}</td>
                        </tr>
                    );

                })}
            </tbody>
        </Table>
    )
}