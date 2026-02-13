import React from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../components/Upload";
import "./Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
<div className="home-container">
      <div className="home-header">
        <h2>Welcome to Decentralized Drive</h2>
        <p>Upload, manage, and share files securely without servers.</p>
      </div>

      <div className="home-card">
        <Upload />

        <div className="home-actions">
          <button
            className="home-btn"
            onClick={() => navigate("/my-files")}
          >
            My Files
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/shared-files")}
          >
            Shared With Me
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
