import { useState, useEffect, useContext } from 'react'
import { Web3Context } from '../web3container/web3container';

import VerifiedVoting from '../../abis/VerifiedVoting.json';

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
                const contract = new web3.contract(abi, address);

            }
        })()
    }, [web3])

    return (
        <div>
            {// Current Vote Chart
            }
        </div>
    )
}
