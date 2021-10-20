import { Table } from 'react-bootstrap'

export default function VoteBlock(props) {
    //set state variable containing candidate details

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

            </tbody>
            {
                //map out each candidate details
            }
        </Table>
    )
}