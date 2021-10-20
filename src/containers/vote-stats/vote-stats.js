import { useState, useEffect, useContext } from 'react'
import VoteBlock from '../../components/voting-block/voting-block';

import { Web3Context } from '../../context-providers/web3-provider/web3-provider';
import { ContractContext } from '../../context-providers/contract-provider/contract-provider';

export default function VoteStats(props) {
    const [candidates, setCandidates] = useState([]);

    const web3 = useContext(Web3Context);
    const contract = useContext(ContractContext)

    useEffect(() => {
        ( async() => {            
            if (contract && contract !== {}){
                console.log(contract.candidates);
            }
        })()
    }, [contract])

    return (
        <VoteBlock candidates={candidates} />
    )
}
