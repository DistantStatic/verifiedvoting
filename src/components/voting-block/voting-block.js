import { Table } from 'react-bootstrap'

export default function VoteBlock( { candidates } ) {

    return(
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Address</th>
                    <th>Vote Count</th>
                </tr>
            </thead>
            <tbody>
            {
                //map out each candidate details
            }
            </tbody>
        </Table>
    )
}