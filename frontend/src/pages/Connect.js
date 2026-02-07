import React from 'react'
import { useNavigate } from 'react-router-dom';

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
    <div className="page">
      <div className="card">
        <h1>Connect Wallet</h1>
        <p>Please connect your MetaMask wallet to continue.</p>

        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </div>

  )
}

export default Connect