import { useContext } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';

import { ContractContext } from '../../context-providers/contract-provider/contract-provider';

export default function EnterRaceModal(props) {

    const contract = useContext(ContractContext);

    const enterRace = () => {
        contract.methods.enterRace().call();
    }

    return(
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header>
                {
                    //Contract Address, Start Date
                }
                <Button variant="danger" onClick={props.hide}>X</Button>
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
                <Container>
                    <Button color='primary' onClick={enterRace}>Enter</Button>
                    <Button color='danger' onClick={props.hide}>Cancel</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    )
}