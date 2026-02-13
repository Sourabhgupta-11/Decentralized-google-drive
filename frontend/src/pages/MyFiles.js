import React, { useEffect, useState } from "react";
import { getReadContract,getWriteContract } from "../contract.js";
import "./MyFiles.css";
import Navbar from "../components/Navbar.js";

const MyFiles = () => {
  const [files, setFiles] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeFileId, setActiveFileId] = useState(null);
  const [sharedWith, setSharedWith] = useState([]);
  const [newShareAddress, setNewShareAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const getFileIcon = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) return "🖼️";
  if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "🎥";
  if (["pdf"].includes(ext)) return "📕";
  if (["doc", "docx"].includes(ext)) return "📝";
  if (["xls", "xlsx"].includes(ext)) return "📊";
  if (["zip", "rar"].includes(ext)) return "🗜️";
  return "📁";
};

  // -------- LOAD FILES --------
  const loadFiles = async () => {
    const contract = await getWriteContract();
    const data = await contract.getMyFiles();
    setFiles(data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  // -------- LOAD SHARED USERS --------
  const loadSharedUsers = async (fileId) => {
    try {
      const contract = await getReadContract();
      const users = await contract.getFileSharedWith(fileId);
      setSharedWith(users);
    } catch (err) {
      console.error("Load shared users error:", err);
      setSharedWith([]);
    }
  };


  // -------- OPEN MODAL --------
  const openShareModal = async (fileId) => {
    const normalizedId = fileId.toString(); 
    setActiveFileId(normalizedId);
    setNewShareAddress("");
    setShowShareModal(true);
    await loadSharedUsers(normalizedId);
  };

  // -------- ADD SHARE --------
    const handleAddShare = async () => {
    if (!newShareAddress) return alert("Enter wallet address");

    try {
      setLoading(true);
      const contract = await getWriteContract();
      const tx = await contract.shareFile(activeFileId, newShareAddress);
      await tx.wait();

      await loadSharedUsers(activeFileId); // refresh
      setNewShareAddress("");
    } catch (err) {
      console.error("Share failed:", err);
      alert("Share failed");
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
      console.error("Remove failed:", err);
      alert("Remove failed");
    } finally {
      setLoading(false);
    }
  };

  // -------- DELETE FILE --------
  const handleDelete = async (fileId) => {
    if (!window.confirm("Delete this file permanently?")) return;

    const contract = await getWriteContract();
    const tx = await contract.deleteFile(fileId);
    await tx.wait();

    await loadFiles();
  };

  return (
    <>
    <Navbar/>
    <div className="myfiles-page">
      <div className="myfiles-title">My Files</div>

      {files.length === 0 && <p>No files uploaded</p>}

      <div className="files-grid">
        {files.map((file) => (
          <div key={file.id} className="file-card">
            <div
              className="file-name"
              onClick={() =>
                window.open(
                  `https://gateway.pinata.cloud/ipfs/${file.ipfsHash}`,
                  "_blank"
                )
              }
            >
              <span className="file-icon">
    {getFileIcon(file.name)}
  </span>
  <span className="file-text">
    {file.name}
  </span>

            </div>

            <div className="file-date">
              {new Date(Number(file.uploadedAt) * 1000).toDateString()}
            </div>

            <div className="file-actions">
              <button
                className="share-btn"
                onClick={() => openShareModal(file.id)}
              >
                Share
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(file.id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* -------- SHARE MODAL -------- */}
      {showShareModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-title">Manage Access</div>

            {sharedWith.length === 0 && (
              <div className="empty-text">Not shared with anyone yet</div>
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

            <hr style={{ borderColor: "#1f2937", margin: "14px 0" }} />

            <input
              className="modal-input"
              placeholder="Wallet address"
              value={newShareAddress}
              onChange={(e) => setNewShareAddress(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowShareModal(false)}>Close</button>
              <button onClick={handleAddShare} disabled={loading}>
                Add Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MyFiles;
