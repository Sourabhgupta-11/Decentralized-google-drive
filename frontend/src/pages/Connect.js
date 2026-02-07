import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Connect.css";

const Connect = () => {
    const navigateTo=useNavigate()
    const connectWallet=async(address)=>{
    try {
        if(window.ethereum){
            const account=await window.ethereum.request({method:'eth_requestAccounts'});
            localStorage.setItem("walletAddress", account[0]);
            navigateTo("/home");
        }
        else{
            alert("Install Metamask")
        }
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className="connect-container">
      <div className="connect-card">
        <h1>Decentralized Drive</h1>
        <p>
          Securely store and share your files using blockchain and IPFS.
        </p>
        <button className="connect-btn" onClick={connectWallet}>
          Connect MetaMask
        </button>
      </div>
    </div>
  )
}

export default Connect