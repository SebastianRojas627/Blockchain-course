import React, { useEffect, useState } from 'react';
import './App.css';
import { connectWallet, initialize } from './ethereum/web3';
//import contractMain from "./ethereum/abis/Main.json";
import contractMain from "./ethereum-hardhat/artifacts/src/ethereum-hardhat/contracts/Main.sol/Main.json"

function App() {

  const [contract,setContract]= useState<any>('')
  const [address,setAddress] = useState<any>('')
  const [destAddress,setDestAddress] = useState<any>('')
  const [supply,setSupply] = useState<any>('')
  const [quantity1,setQuantity1] = useState<any>('')
  const [quantity2,setQuantity2] = useState<any>('')
  const [quantity3,setQuantity3] = useState<any>('')
  const [message, setMessage] = useState<any>('')
  const [ethQuantity1,setEthQuantity1] = useState<any>('')
  const [destAddress2,setDestAddress2] = useState<any>('')

  useEffect(() => {
    //@ts-ignore
    if(window.web3) {
      initialize()
      loadBlockChainData()
    }
  }, [])

  const loadBlockChainData = async () => {
    //@ts-ignore
    const Web3 = window.web3
    
    const abi = contractMain.abi;
    const contractDeployed = new Web3.eth.Contract(abi, '0x293384751e29C849519fa3B7a518501b6B265af0');
    setAddress(await contractDeployed.methods.getContractAddress().call())
    setMessage("Bienvenido!")
    setContract(contractDeployed)
  }

  const onBuyTokens = async () => {

    // @ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts()
    setMessage("Realizando compra")
    await contract.methods.buyTokens(destAddress,quantity1).send({
      from:accounts[0],
      value:Web3.utils.toWei(ethQuantity1,"ether")
    })
    setMessage("Compra Realizada")
  }

  const onGetAccountBalance = async () => {
    setMessage("Obteniendo balance de cuenta")
    
    setMessage("Balance: " + await contract.methods.balanceAccount(destAddress2).call())
  }

  const onGetSupply = async () => {
    setMessage("Obteniendo cantidad total de tokens")
    setSupply(await contract.methods.getTotalSupply().call())
    setMessage("Cantidad total obtenida")
  }

  const onGenerateTokens = async () => {
    // @ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts()
    setMessage("Creando tokens")
    await contract.methods.generateTokens(quantity2).send({
      from:accounts[0]
    })
    setMessage("Creacion de tokens realizada")
  }

  const onGetPrice = async () => {
    setMessage(quantity3 + " GOL en Ethereum es " + await contract.methods.priceToken(quantity3).call()/1000000000000000000 + " ETH")
  }

  return (
    <div className="App">
      <header className="App-header"> 
      <h1>GOL Token</h1>
      <button className="btn btn-primary" onClick={()=>connectWallet()}>Connect</button>
        <p>{message}</p>

        <div>---------------------------------------------</div>
        <h2>Comprar Tokens</h2>
        <div className="form-group" >
        <input type="text" className="form-control" id="buyAdd" placeholder="Direccion destino" value={destAddress} onChange={ (event) => { setDestAddress(event.target.value) } }/>
        <input type="text" className="form-control" id="buyToken" placeholder="Cantidad de tokens a comprar" value={quantity1} onChange={ (event) => { setQuantity1(event.target.value) } }/>
        <input type="text" className="form-control" id="buyToken" placeholder="Valor a pagar" value={ethQuantity1} onChange={ (event) => { setEthQuantity1(event.target.value) } }/>
        </div>
        <button type="button" className="btn btn-danger" onClick={()=>onBuyTokens()}>Comprar GOL</button>

        <div>---------------------------------------------</div>
        <h2>Balance de Usuario</h2>
        <div className="form-group" >
        <input type="text" className="form-control" id="balanceAdd" placeholder="Dirección del usuario" value={destAddress2} onChange={ (event) => { setDestAddress2(event.target.value) } }/>
        </div>
        <button type="button" className="btn btn-danger" onClick={()=>onGetAccountBalance()}>Balance de Usuario</button>
        
        <div>---------------------------------------------</div>
        <h2>Cantidad total de GOL {supply}</h2>
        <button type="button" className="btn btn-danger" onClick={()=>onGetSupply()}>Cantidad Total de GOL</button>

        <div>---------------------------------------------</div>
        <h2>Generar nuevos GOL</h2>
        <div className="form-group" >
        <input type="text" className="form-control" id="balanceAdd" placeholder="Cantidad a aumentar" value={quantity2} onChange={ (event) => { setQuantity2(event.target.value) } }></input>
        </div>
        <button type="button" className="btn btn-danger"  onClick={()=>onGenerateTokens()}>Agregar nuevos GOL</button>

        <div>---------------------------------------------</div>
        <h2>Dirección del Smart Contract en Blockchain Goerli</h2>
        <h4>{address}</h4>

        <div>---------------------------------------------</div>
        <h2>Precio de GOL en ETH</h2>
        <div className="form-group" >
        <input type="text" className="form-control" id="balanceAdd" placeholder="Cantidad de Tokens" value={quantity3} onChange={ (event) => { setQuantity3(event.target.value) } }></input>
        </div>
        <button type="button" className="btn btn-danger" onClick={()=>onGetPrice()}>Obtener Precio</button>
        
      </header>
    </div>
  );

}

export default App;
