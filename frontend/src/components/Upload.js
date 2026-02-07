import React, { useState } from "react";
import { uploadToPinata } from "../pinata";
import { getContract } from "../contract";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [allowReshare, setAllowReshare] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Select a file");

    try {
      const ipfsHash = await uploadToPinata(file);
      const contract = await getContract();

      const tx = await contract.uploadFile(
        file.name,
        ipfsHash,
        allowReshare
      );
      await tx.wait();

      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h3>Upload File</h3>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br />

      <label>
        <input
          type="checkbox"
          onChange={(e) => setAllowReshare(e.target.checked)}
        />
        Allow resharing
      </label>

      <br />

      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default Upload;
