import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';

import { Web3Context } from '../../context-providers/web3-provider/web3-provider';

import VoteStats from '../vote-stats/vote-stats';

export default function MainPage(props) {
    const [account, setAccount] = useState('');

    const web3 = useContext(Web3Context);

    useEffect(() => {
        (async () => {
            console.log('got called')
            if (web3.eth === undefined) return;
            let accountList = await web3.eth.getAccounts()
            setAccount(accountList[0]);
        })();
    }, [web3])

    return(
        <Container>
            <h1>Verified Voting</h1>
            <p>{account}</p>
            <VoteStats />
        </Container>
    )
}
