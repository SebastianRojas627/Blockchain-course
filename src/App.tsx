import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { connectWallet, initialize } from "./ethereum/web3";
import contractLottery from ".ethereum/abis/Lottery.json";

function App() {

  useEffect( () => { //cuando el componente nace
    //@ts-ignore
    if(window.web3) {
      initialize()
    }
  }, [])

  const loadBlockchainData = async () => {

    //@ts-ignore
    const Web3 = window.web3;

    // Netowork id: Rinkeby:4, Ganache:5777, BSC:97
    const networkData = contractLottery.networks['5777'];
    console.log('networkData: ', networkData);

    if(networkData) {

      const abi = contractLottery.abi;
      const address = networkData.address;
      console.log('address: ', address)

      const contractDeployed = new Web3.eth.Contract(abi, address);

      const players = await contractDeployed.methods.getPlayers().call();
      console.log('players: ', players, players.length)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Hi React, Truffle, Firebase</p>
        <button onClick={() => connectWallet()}>Connect</button>
        <button onClick={() => loadBlockchainData()}>Load</button>
      </header>
    </div>
  );
}

export default App;
