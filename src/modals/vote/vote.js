import { Modal, Button } from 'react-bootstrap';

/**
 * Potentially to be removed. Functionality can be added direclty
 * to main page without need for modal.
 */


export default function VoteModal(props) {
    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                <Button variant="danger" onClick={props.hide}>X</Button>
            </Modal.Header>
            <Modal.Body>
                {
                    //candidate list
                }
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}