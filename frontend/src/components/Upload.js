import { uploadToPinata } from "../pinata";
import { getContract } from "../contract";
import { useState } from "react";

export default function Upload({ refresh }) {
  const [file, setFile] = useState(null);
  const [allowReshare, setAllowReshare] = useState(false);

  const upload = async () => {
    if (!file) return alert("Select a file");

    const ipfsHash = await uploadToPinata(file);
    const contract = await getContract();

    const tx = await contract.uploadFile(
      file.name,
      ipfsHash,
      allowReshare
    );
    await tx.wait();

    alert("File uploaded");
    refresh();
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <label>
        <input
          type="checkbox"
          onChange={(e) => setAllowReshare(e.target.checked)}
        />
        Allow Reshare
      </label>
      <button onClick={upload}>Upload</button>
    </div>
  );
}
