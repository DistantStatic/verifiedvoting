import { useContext, useState, useEffect } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';

import { ContractContext } from '../../context-providers/contract-provider/contract-provider';

export default function EnterRaceModal(props) {
    const [candidateCount, setCandidateCount] = useState(0);
    const [enterCost, setEnterCost] = useState(0);
    const [electionStart, setElectionStart] = useState(0);

    const contract = useContext(ContractContext);

    const enterRace = () => {
        contract.methods.enterRace().call();
    }
    
    useEffect(async () => {
     //call contract for candidate and costs
        if(contract.methods == undefined) return;
        const cost = await contract.methods.entranceFee().call();
        const start = await contract.methods.voteStart().call();
        setElectionStart(start);
        setEnterCost(cost);
    }, [contract])

    return(
        <Modal size="lg" show={props.show} onHide={props.hide}>
            <Modal.Header>
                {
                    //Contract Address, Start Date
                }
                <h3>Contract Address: <br/>{contract._address}</h3>
                <Button variant="danger" onClick={props.hide}>X</Button>
            </Modal.Header>
            <Modal.Body>
                {
                    //Current Candidate Count + Cost
                }
                <h3>Election Start: {new Date(parseInt(electionStart)).toString()}</h3>
                <h3>Candidates: {candidateCount}</h3>
                <h3>Cost to Enter: {enterCost}</h3>
            </Modal.Body>
            <Modal.Footer>
                <Container>
                    <Button color='primary' onClick={enterRace}>Enter</Button>
                    <Button color='danger' onClick={props.hide}>Cancel</Button>
                </Container>
            </Modal.Footer>
        </Modal>
    )
}