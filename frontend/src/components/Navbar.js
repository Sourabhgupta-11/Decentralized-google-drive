import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const wallet = localStorage.getItem("walletAddress");
  const isDemo = localStorage.getItem("authMode") === "demo";
  const [copied, setCopied] = useState(false);

  const logout = () => {
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("authMode");
    navigate("/");
  };

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  const copyAddr = () => {
    if (!wallet) return;
    navigator.clipboard.writeText(wallet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="nav-logo">Decentralized Drive</div>
        {isDemo && <span className="demo-badge">Demo · Sepolia</span>}
      </div>

      <div className="nav-right">
        {wallet && (
          <button className="wallet-display" onClick={copyAddr} title="Click to copy">
            <span className="wallet-dot" />
            <span className="wallet-text">
              {isDemo ? "Demo: " : ""}{shortenAddress(wallet)}
            </span>
            <span className="wallet-copy">{copied ? "Copied!" : "Copy"}</span>
          </button>
        )}

        <button className="logout-btn" onClick={logout}>
          {isDemo ? "Exit Demo" : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;