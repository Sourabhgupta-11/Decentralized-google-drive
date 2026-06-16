import React, { useEffect, useState } from "react";
import { getWriteContract } from "../contract.js";
import "./MyFiles.css";
import Navbar from "../components/Navbar.js";
import FileGrid from "../components/FileGrid.js";
import ShareModal from "../components/Modal.js";
import useShare from "../hooks/useShare.js";

const MyFiles = () => {
  const [files, setFiles]   = useState([]);
  const [loading, setLoading] = useState(true);

  const { showModal, setShowModal, sharedWith, newShareAddress, setNewShareAddress,
    loading: shareLoading, openShareModal, handleAddShare, handleRemoveShare } = useShare();

  const loadFiles = async () => {
    setLoading(true);
    try {
      const contract = await getWriteContract();
      const data = await contract.getMyFiles();
      setFiles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFiles(); }, []);

  const handleDelete = async (fileId) => {
    if (!window.confirm("Permanently delete this file from the blockchain?")) return;
    const contract = await getWriteContract();
    const tx = await contract.deleteFile(fileId);
    await tx.wait();
    await loadFiles();
  };

  return (
    <>
      <Navbar />
      <div className="page-root myfiles-page">
        <div className="myfiles-title">My Files</div>
        <div className="myfiles-sub">
          {loading ? "Loading from chain…" : `${files.length} file${files.length !== 1 ? "s" : ""} stored`}
        </div>

        {!loading && files.length === 0 && (
          <div className="myfiles-empty">
            <div className="myfiles-empty-icon">📂</div>
            No files yet — upload one from the Dashboard.
          </div>
        )}

        <FileGrid
          files={files}
          openShareModal={openShareModal}
          allowDelete={true}
          handleDelete={handleDelete}
          myfiles={true}
        />

        <ShareModal
          showModal={showModal} setShowModal={setShowModal}
          sharedWith={sharedWith} newShareAddress={newShareAddress}
          setNewShareAddress={setNewShareAddress}
          handleAddShare={handleAddShare} handleRemoveShare={handleRemoveShare}
          loading={shareLoading}
        />
      </div>
    </>
  );
};

export default MyFiles;
