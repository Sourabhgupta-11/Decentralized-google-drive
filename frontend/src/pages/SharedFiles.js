import React, { useEffect, useState } from "react";
import { getReadContract, getWriteContract } from "../contract";
import "./SharedFiles.css";

const SharedFiles = () => {
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);
  const [sharedWith, setSharedWith] = useState([]);
  const [newShareAddress, setNewShareAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // -------- LOAD SHARED FILES --------
  const loadSharedFiles = async () => {
    try {
      const contract = await getWriteContract();
      const data = await contract.getSharedFiles();


      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSharedFiles();
  }, []);

  // -------- LOAD SHARED USERS --------
  const loadSharedUsers = async (fileId) => {
    try {
      const contract = await getReadContract();
      const users = await contract.getFileSharedWith(fileId);
      setSharedWith(users);
    } catch (err) {
      console.error(err);
      setSharedWith([]);
    }
  };

  // -------- OPEN SHARE MODAL --------
  const openShareModal = async (fileId) => {
    setActiveFileId(fileId);
    setShowModal(true);
    setNewShareAddress("");
    await loadSharedUsers(fileId);
  };

  // -------- ADD SHARE --------
  const handleAddShare = async () => {
    if (!newShareAddress) return alert("Enter address");

    try {
      setLoading(true);
      const contract = await getWriteContract();
      const tx = await contract.shareFile(activeFileId, newShareAddress);
      await tx.wait();

      await loadSharedUsers(activeFileId);
      setNewShareAddress("");
    } catch (err) {
      alert("Reshare failed (maybe not allowed)");
    } finally {
      setLoading(false);
    }
  };

  // -------- REMOVE SHARE --------
  const handleRemoveShare = async (addr) => {
    try {
      setLoading(true);
      const contract = await getWriteContract();
      const tx = await contract.removeShareAccess(activeFileId, addr);
      await tx.wait();

      await loadSharedUsers(activeFileId);
    } catch (err) {
      alert("Not authorized to remove");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sharedfiles-page">
      <div className="sharedfiles-title">Files Shared With Me</div>

      {files.length === 0 && (
        <p className="empty-text">No files shared with you</p>
      )}

      <div className="sharedfiles-grid">
        {files.map((file) => (
          <div key={file.id} className="sharedfile-card">
            <div
              className="sharedfile-name"
              onClick={() =>
                window.open(
                  `https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`,
                  "_blank"
                )
              }
            >
              📄 {file.name}
            </div>

            <div className="sharedfile-owner">
              Owner: {file.owner}
            </div>

            <div className="sharedfile-date">
              {new Date(Number(file.uploadedAt) * 1000).toDateString()}
            </div>

            {/* 🔥 Show share button only if allowReshare */}
            {file.allowReshare && (
              <button
                className="share-btn"
                onClick={() => openShareModal(file.id)}
              >
                Share
              </button>
            )}
          </div>
        ))}
      </div>

      {/* -------- SHARE MODAL -------- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-title">Reshare File</div>

            {sharedWith.length === 0 && (
              <div className="empty-text">
                Not shared with anyone yet
              </div>
            )}

            {sharedWith.map((addr) => (
              <div key={addr} className="shared-user">
                <span>{addr}</span>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveShare(addr)}
                >
                  Remove
                </button>
              </div>
            ))}

            <input
              className="modal-input"
              placeholder="Wallet address"
              value={newShareAddress}
              onChange={(e) => setNewShareAddress(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>
                Close
              </button>
              <button onClick={handleAddShare} disabled={loading}>
                Add Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedFiles;
