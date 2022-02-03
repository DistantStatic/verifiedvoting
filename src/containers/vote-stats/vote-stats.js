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
            //debug purposes
            if (contract && contract !== undefined && contract.methods){
                console.log(contract);
                contract.methods.owner().call()
                    .then((res) => {
                        console.log(res);
                    })
            }
        })()
    }, [contract])

    return (
        <VoteBlock candidates={candidates} />
    )
}
