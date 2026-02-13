import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const wallet = localStorage.getItem("walletAddress");

  const logout = () => {
    localStorage.removeItem("walletAddress");
    navigate("/");
  };

  const shortenAddress = (addr) => {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <div className="nav-logo">Decentralized Drive</div>
      </div>

      <div className="nav-right">
        {wallet && (
          <div className="wallet-display">
            Connected: {shortenAddress(wallet)}
          </div>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
