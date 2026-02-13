import React, { useEffect, useState } from "react";
import {getWriteContract } from "../contract.js";
import "./MyFiles.css";
import Navbar from "../components/Navbar.js";
import FileGrid from "../components/FileGrid.js";
import ShareModal from "../components/Modal.js";
import useShare from "../hooks/useShare.js";


const MyFiles = () => {
  const [files, setFiles] = useState([]);

  //Share functions
  const {showModal,setShowModal,sharedWith,newShareAddress,setNewShareAddress,loading,openShareModal,handleAddShare,handleRemoveShare} = useShare();

  // -------- LOAD FILES --------
  const loadFiles = async () => {
    const contract = await getWriteContract();
    const data = await contract.getMyFiles();
    setFiles(data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

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

      <FileGrid files={files} openShareModal={openShareModal} allowDelete={true} handleDelete={handleDelete} myfiles={true}/>

      <ShareModal showModal={showModal} setShowModal={setShowModal} sharedWith={sharedWith} newShareAddress={newShareAddress} setNewShareAddress={setNewShareAddress} handleAddShare={handleAddShare} handleRemoveShare={handleRemoveShare} loading={loading}/>
    </div>
    </>
  );
};

export default MyFiles;
