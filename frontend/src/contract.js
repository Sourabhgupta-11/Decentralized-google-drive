import { ethers } from "ethers";
import ABI from "./DecentralizedDrive.json";
import "dotenv/config"
export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

export const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};
