import React, { useState } from "react";
import { uploadToPinata } from "../pinata";
import { getContract } from "../contract";
import "./Upload.css"

const Upload = () => {
  const [file, setFile] = useState(null);
  const [allowReshare, setAllowReshare] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Select a file");

    try {
      const ipfsHash = await uploadToPinata(file);
      const contract = await getContract();

      const tx = await contract.uploadFile(
        file.name,
        ipfsHash,
        allowReshare
      );
      await tx.wait();

      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
<div className="upload-wrapper">
      <div className="upload-card">
        <div className="upload-title">Upload File</div>

        {/* FILE PICKER */}
        <label className="file-picker">
          Choose file
          <input
            type="file"
            className="upload-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && <div className="file-name">{file.name}</div>}

        {/* TOGGLE */}
        <div className="toggle-wrapper">
          <span className="toggle-label">Allow resharing</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={allowReshare}
              onChange={(e) => setAllowReshare(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <button className="upload-btn" onClick={uploadFile}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;
