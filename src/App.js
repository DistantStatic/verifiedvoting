//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/navigation/navigation';
import MainPage from './containers/main-page/main-page';
import Web3Container from './containers/web3container/web3container';

function App() {
    return (
        <Web3Container>
            <Navigation />
            <MainPage />
        </Web3Container>
    );
}

export default App;
