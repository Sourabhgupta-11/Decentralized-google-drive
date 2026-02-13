import React, { useEffect, useState } from "react";
import {getWriteContract } from "../contract";
import "./SharedFiles.css";
import Navbar from "../components/Navbar";
import FileGrid from "../components/FileGrid";
import ShareModal from "../components/Modal";
import useShare from "../hooks/useShare";

const SharedFiles = () => {
  const [files, setFiles] = useState([]);

  //Share functions
  const {showModal,setShowModal,sharedWith,newShareAddress,setNewShareAddress,loading,openShareModal,handleAddShare,handleRemoveShare} = useShare();

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

  
  return (
    <>
    <Navbar/>
    <div className="sharedfiles-page">
      <div className="sharedfiles-title">Files Shared With Me</div>

      {files.length === 0 && (
        <p className="empty-text">No files shared with you</p>
      )}

      <FileGrid files={files} openShareModal={openShareModal} showOwner={true}/>

      <ShareModal showModal={showModal} setShowModal={setShowModal} sharedWith={sharedWith} newShareAddress={newShareAddress} setNewShareAddress={setNewShareAddress} handleAddShare={handleAddShare} handleRemoveShare={handleRemoveShare} loading={loading} title="Reshare File"/>
    </div>
    </>
  );
};

export default SharedFiles;
