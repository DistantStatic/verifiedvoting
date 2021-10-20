import { Modal, Button } from 'react-bootstrap';

export default function VoteModal(props) {
    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                <Button variant="danger" onClick={props.hide}>X</Button>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}