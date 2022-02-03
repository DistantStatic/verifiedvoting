import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';

export const Web3Context = React.createContext()

export default function Web3Container(props) {
    const [web3state, setWeb3State] = useState({});

    async function loadWeb3() {
        if (window.ethereum) {
            let web3 = new Web3(Web3.givenProvider);
            setWeb3State(web3);
        } else {
            alert('Ethereum compatable browser required; Consider Brave browser or MetaMask extension!')
        }
    }

    useEffect(() => {
        loadWeb3();
    }, [])


    return(
        <Web3Context.Provider value={web3state}>
            {props.children}
        </Web3Context.Provider>
    )

}
