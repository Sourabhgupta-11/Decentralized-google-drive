import React, { useState } from "react";
import { uploadToPinata } from "../pinata";
import { getWriteContract } from "../contract";
import "./Upload.css";

const Upload = () => {
  const [file, setFile]           = useState(null);
  const [allowReshare, setAllow]  = useState(false);
  const [status, setStatus]       = useState(null); // null | 'uploading' | 'success' | 'error'
  const [msg, setMsg]             = useState("");

  const onFile = (e) => {
    setFile(e.target.files[0]);
    setStatus(null);
  };

  const uploadFile = async () => {
    if (!file) { setStatus("error"); setMsg("Please select a file first."); return; }

    try {
      setStatus("uploading");
      setMsg("Uploading to IPFS…");

      const ipfsHash = await uploadToPinata(file);
      setMsg("Saving to blockchain…");

      const contract = await getWriteContract();
      const tx = await contract.uploadFile(file.name, ipfsHash, allowReshare);
      await tx.wait();

      setStatus("success");
      setMsg(`✓ "${file.name}" uploaded successfully!`);
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMsg("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-card">

        <label className="file-picker">
          <span className="pick-icon">☁️</span>
          <span className="pick-main">{file ? file.name : "Click to choose a file"}</span>
          <span className="pick-sub">Any file type · Stored on IPFS</span>
          <input type="file" className="upload-input" onChange={onFile} />
        </label>

        {file && (
          <div className="file-name-row">
            <span className="file-name-icon">📄</span>
            {file.name} &nbsp;·&nbsp; {(file.size / 1024).toFixed(1)} KB
          </div>
        )}

        <div className="toggle-wrapper">
          <span className="toggle-label">Allow resharing by recipients</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={allowReshare}
              onChange={(e) => setAllow(e.target.checked)}
            />
            <span className="slider" />
          </label>
        </div>

        <button
          className="upload-btn"
          onClick={uploadFile}
          disabled={status === "uploading"}
        >
          {status === "uploading" ? "Uploading…" : "Upload to IPFS"}
        </button>

        {status && (
          <div className={`upload-status ${status}`}>{msg}</div>
        )}
      </div>
    </div>
  );
};

export default Upload;
