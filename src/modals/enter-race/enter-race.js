import { Modal, Button } from 'react-bootstrap';

export default function EnterRaceModal(props) {

    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                {
                    //Contract Address, Start Date
                }
                <Button variant="danger" >X</Button>
            </Modal.Header>
            <Modal.Body>
                {
                    //Current Candidate Count + Cost
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    //Enter Button and Cancel Button
                }
            </Modal.Footer>
        </Modal>
    )
}