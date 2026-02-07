import React from "react";
import { useNavigate } from "react-router-dom";
import Upload from "../components/Upload";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Decentralized Drive</h1>

      {/* Upload Section */}
      <Upload />

      <hr />

      {/* Navigation Buttons */}
      <button onClick={() => navigate("/my-files")}>
        Get My Files
      </button>

      <button onClick={() => navigate("/shared-files")}>
        Get Shared Files
      </button>
    </div>
  );
};

export default Home;
