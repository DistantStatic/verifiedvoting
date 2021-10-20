import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '../web3container/web3container';
import Web3 from 'web3';

import VerifiedVoting from '../../abis/VerifiedVoting.json';

import VoteBlock from '../../components/voting-block/voting-block';

export default function(props) {
    const [candidates, setCandidats] = useState([]);
    const [contract, setContract] = useState({});

    const web3 = useContext(Web3Context);

    async function getCandidate() {
        if (contract && contract !== {}){
            console.log(contract.candidates);
        }
    }

    useEffect(() => {
        (async () => {
            if (web3 === undefined) return;
            const netId = await web3.eth.net.getId();
            const netData = VerifiedVoting.networks[netId];
            
            if(netData) {
                const abi = VerifiedVoting.abi;
                const address = netData.address;
                setContract(new web3.eth.Contract(abi, address));

            }
        })()
    }, [web3])

    return (
        <VoteBlock />
    )
}
