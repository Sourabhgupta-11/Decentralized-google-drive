import axios from "axios";

const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

export const uploadToPinata = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data.IpfsHash;
};
