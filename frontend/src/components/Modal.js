import React from "react";
import "./Modal.css";

const ShareModal = ({
  showModal, setShowModal,
  sharedWith, newShareAddress, setNewShareAddress,
  handleAddShare, handleRemoveShare, loading,
  title = "Manage Access",
}) => {
  if (!showModal) return null;

  const shortAddr = (a) => a.slice(0, 10) + "…" + a.slice(-8);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
      <div className="modal-box">
        <div className="modal-title">{title}</div>
        <div className="modal-subtitle">
          {sharedWith.length === 0
            ? "No one has access yet."
            : `${sharedWith.length} address${sharedWith.length > 1 ? "es" : ""} with access`}
        </div>

        {sharedWith.map((addr) => (
          <div key={addr} className="shared-user">
            <span className="shared-addr">{shortAddr(addr)}</span>
            <button className="remove-btn" onClick={() => handleRemoveShare(addr)}>
              Revoke
            </button>
          </div>
        ))}

        <input
          className="modal-input"
          placeholder="0x… wallet address"
          value={newShareAddress}
          onChange={(e) => setNewShareAddress(e.target.value)}
        />

        <div className="modal-actions">
          <button className="modal-close-btn" onClick={() => setShowModal(false)}>
            Close
          </button>
          <button className="modal-add-btn" onClick={handleAddShare} disabled={loading}>
            {loading ? "Saving…" : "Grant Access"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
