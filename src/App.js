//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation/navigation';
import MainPage from './containers/main-page/main-page';
import Web3Container from './context-providers/web3-provider/web3-provider';
import ContractContainer from './context-providers/contract-provider/contract-provider';

function App() {
    return (
        <Web3Container>
            <ContractContainer>
                <Navigation />
                <MainPage />
            </ContractContainer>
        </Web3Container>
    );
}

export default App;
