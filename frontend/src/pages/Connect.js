import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDemoAddress } from "../contract";
import "./Connect.css";

const Connect = () => {
  const navigate = useNavigate();
  const [connecting, setConnecting] = useState(false);
  const demoAddress = getDemoAddress();

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        setConnecting(true);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        localStorage.setItem("walletAddress", accounts[0]);
        localStorage.setItem("authMode", "metamask");
        navigate("/home");
      } else {
        alert("MetaMask not detected. Use the Demo Account below to explore the full app.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setConnecting(false);
    }
  };

  const continueWithDemo = () => {
    if (!demoAddress) return;
    localStorage.setItem("walletAddress", demoAddress);
    localStorage.setItem("authMode", "demo");
    navigate("/home");
  };

  const shortenAddr = (a) => a ? a.slice(0, 10) + "…" + a.slice(-6) : "";

  return (
    <div className="page-root connect-page">
      <button className="conn-back" onClick={() => navigate("/")}>← Back</button>

      <div className="conn-wrap">

        {/* left: branding panel */}
        <div className="conn-left">
          <div className="conn-logo-badge">⛓️</div>
          <h1 className="conn-brand">Decentralized<br/>Drive</h1>
          <p className="conn-brand-sub">
            Your files live on IPFS.<br />
            Your access rules live on Ethereum.<br />
            Nothing in between.
          </p>
          <ul className="conn-perks">
            <li><span className="perk-dot" style={{background:"#38bdf8"}} />No servers</li>
            <li><span className="perk-dot" style={{background:"#818cf8"}} />No accounts to create</li>
            <li><span className="perk-dot" style={{background:"#34d399"}} />100 % on-chain access control</li>
          </ul>
        </div>

        {/* right: auth card */}
        <div className="conn-card">
          <div className="conn-card-tag">Connect to get started</div>

          <button
            className="conn-metamask-btn"
            onClick={connectWallet}
            disabled={connecting}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
              alt="MetaMask"
              className="conn-mm-icon"
            />
            {connecting ? "Connecting…" : "Connect MetaMask"}
          </button>

          <p className="conn-mm-hint">Requires the MetaMask browser extension on Sepolia testnet.</p>

          {demoAddress && (
            <>
              <div className="conn-divider"><span>or try without a wallet</span></div>

              <button className="conn-demo-btn" onClick={continueWithDemo}>
                <span className="conn-demo-icon">🚀</span>
                <span>
                  <strong>Continue with Demo Account</strong>
                  <small>{shortenAddr(demoAddress)}</small>
                </span>
              </button>

              <p className="conn-demo-note">
                A pre-funded Sepolia wallet provided by this site. Upload files, share
                access, and test every feature — no MetaMask or real ETH required.
              </p>
            </>
          )}

          <div className="conn-network-row">
            <span className="conn-dot-live" />
            Sepolia Testnet · Ethereum
          </div>
        </div>

      </div>
    </div>
  );
};

export default Connect;
