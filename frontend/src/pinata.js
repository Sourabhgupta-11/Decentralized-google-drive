
const PINATA_JWT = process.env.REACT_APP_PINATA_JWT;

export const uploadToPinata = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Pinata upload failed");
  }

  const data = await res.json();
  return data.IpfsHash;
};
