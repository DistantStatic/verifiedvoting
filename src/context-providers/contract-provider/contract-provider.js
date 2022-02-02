import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from "../web3-provider/web3-provider";

//Contract Abi
import VeriVote from '../../abis/VeriVote.json';

export const ContractContext = React.createContext();

export default function ContractContainer(props) {
    const [contract, setContract] = useState({});

    const web3 = useContext(Web3Context);

    useEffect(() => {
        (async () => {
            if (web3 === undefined || web3.eth === undefined) return;
            const netId = await web3.eth.net.getId();
            const netData = VeriVote.networks[netId];
            
            if(netData) {
                const abi = VeriVote.abi;
                const address = netData.address;
                setContract(new web3.eth.Contract(abi, address));
                console.log('NetData available')
            }
        })()
    }, [web3])

    return(
        <ContractContext.Provider value={contract}>
            {props.children}
        </ContractContext.Provider>
    )
}
