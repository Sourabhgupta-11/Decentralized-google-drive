import React from "react";
import "./FileGrid.css"

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

const FileGrid = ({
  files,
  openShareModal,
  showOwner = false,
  allowDelete = false,
  handleDelete,
  myfiles=false
}) => {
  return (
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

          {showOwner && (
            <div className="file-owner">
              Owner: {file.owner}
            </div>
          )}

          <div className="file-date">
            {new Date(Number(file.uploadedAt) * 1000).toDateString()}
          </div>

          <div className="file-actions">
            {(myfiles || file.allowReshare) && (
              <button
                className="share-btn"
                onClick={() => openShareModal(file.id)}
              >
                Share
              </button>
            )}

            {allowDelete && (
              <button
                className="delete-btn"
                onClick={() => handleDelete(file.id)}
              >
                Delete
              </button>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default FileGrid;
