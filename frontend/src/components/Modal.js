import React from "react";
import "./Modal.css"

const ShareModal = ({showModal,setShowModal,sharedWith,newShareAddress,setNewShareAddress,handleAddShare,handleRemoveShare,loading,
  title = "Manage Access"
}) => {

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="modal-title">{title}</div>

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
  );
};

export default ShareModal;
