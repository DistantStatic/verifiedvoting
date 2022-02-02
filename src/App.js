//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation/navigation';
import MainPage from './containers/main-page/main-page';
import Web3Container from './context-providers/web3-provider/web3-provider';
import ContractContainer from './context-providers/contract-provider/contract-provider';
import EnterRaceModal from './modals/enter-race/enter-race';
import VoteModal from './modals/vote/vote';
import { useState } from 'react';

function App() {
    
    const [voteModal, setVoteModal] = useState(false);
    const [raceModal, setRaceModal] = useState(false);

    const showVoteModal = () => {
        setVoteModal(true);
    }

    const showRaceModal = () => {
        setRaceModal(true);
    }

    return (
        <Web3Container>
            <ContractContainer>
                <Navigation raceShow={showRaceModal} voteShow={showVoteModal} />
                <MainPage />
                <EnterRaceModal show={raceModal} hide={() => setRaceModal(false)}/>
                <VoteModal show={voteModal} hide={() => setVoteModal(false)} />
            </ContractContainer>
        </Web3Container>
    );
}

export default App;
