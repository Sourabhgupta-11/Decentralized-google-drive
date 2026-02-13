import { useState } from "react";
import { getReadContract, getWriteContract } from "../contract";

const useShare = () => {

  const [showModal, setShowModal] = useState(false);
  const [activeFileId, setActiveFileId] = useState(null);
  const [sharedWith, setSharedWith] = useState([]);
  const [newShareAddress, setNewShareAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Load shared users
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

  // 🔥 Open modal
  const openShareModal = async (fileId) => {
    setActiveFileId(fileId);
    setShowModal(true);
    setNewShareAddress("");
    await loadSharedUsers(fileId);
  };

  // 🔥 Add share
  const handleAddShare = async () => {
    if (!newShareAddress) return alert("Enter wallet address");

    try {
      setLoading(true);
      const contract = await getWriteContract();
      const tx = await contract.shareFile(activeFileId, newShareAddress);
      await tx.wait();

      await loadSharedUsers(activeFileId);
      setNewShareAddress("");
    } catch (err) {
      console.error("Share failed:", err);
      alert("Share failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Remove share
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

  return {
    showModal,
    setShowModal,
    sharedWith,
    newShareAddress,
    setNewShareAddress,
    loading,
    openShareModal,
    handleAddShare,
    handleRemoveShare
  };
};

export default useShare;
