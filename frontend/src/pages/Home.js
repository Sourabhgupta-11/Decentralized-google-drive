import React from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../components/Upload";
import "./Home.css";
import Navbar from "../components/Navbar";
import { isDemoMode } from "../contract";

const Home = () => {
  const navigate = useNavigate();
  const demo = isDemoMode();
  const wallet = localStorage.getItem("walletAddress");
  const short = wallet ? wallet.slice(0, 8) + "…" + wallet.slice(-6) : "";

  return (
    <div className="page-root">
      <Navbar />
      <div className="home-container">

        {/* Welcome header */}
        <div className="home-header">
          <h2 className="home-title">
            {demo ? "Welcome, Demo User" : "Your Drive"}
          </h2>
          <p className="home-subtitle">
            {demo
              ? "Exploring on Sepolia testnet with a shared demo wallet."
              : `Connected as ${short}`}
          </p>
        </div>

        {demo && (
          <div className="demo-banner">
            <span className="demo-banner-icon">ℹ️</span>
            <span>
              <strong>Demo Mode active.</strong> All transactions run on Sepolia testnet using
              a shared wallet — no MetaMask or real funds needed. Upload, share, and delete freely.
            </span>
          </div>
        )}

        {/* Quick-action cards */}
        <div className="home-quick-cards">
          <button className="quick-card" onClick={() => navigate("/my-files")}>
            <span className="quick-icon">📁</span>
            <div>
              <div className="quick-title">My Files</div>
              <div className="quick-sub">View, share, and manage your uploads</div>
            </div>
            <span className="quick-arrow">→</span>
          </button>
          <button className="quick-card" onClick={() => navigate("/shared-files")}>
            <span className="quick-icon">🤝</span>
            <div>
              <div className="quick-title">Shared With Me</div>
              <div className="quick-sub">Files others have granted you access to</div>
            </div>
            <span className="quick-arrow">→</span>
          </button>
        </div>

        {/* Upload */}
        <div className="home-upload-section">
          <div className="home-upload-label">Upload a file to IPFS</div>
          <Upload />
        </div>

      </div>
    </div>
  );
};

export default Home;
