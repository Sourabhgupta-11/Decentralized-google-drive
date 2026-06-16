import { ethers } from "ethers";
import ABI from "./DecentralizedDrive.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const DEMO_PRIVATE_KEY = process.env.REACT_APP_DEMO_PRIVATE_KEY;
const RPC_URL =
  process.env.REACT_APP_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";

// Is the visitor currently using the site-provided demo account?
export const isDemoMode = () => localStorage.getItem("authMode") === "demo";

// Demo wallet address (derived from the demo private key)
export const getDemoAddress = () => {
  if (!DEMO_PRIVATE_KEY) return null;
  try {
    return new ethers.Wallet(DEMO_PRIVATE_KEY).address;
  } catch {
    return null;
  }
};

// READ-ONLY contract (works for both MetaMask users and Demo users)
export const getReadContract = async () => {
  let provider;

  if (isDemoMode()) {
    provider = new ethers.JsonRpcProvider(RPC_URL);
  } else {
    if (!window.ethereum) {
      throw new Error("No wallet found. Please install MetaMask or use the Demo Account.");
    }
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
};

// WRITE (METAMASK or DEMO ACCOUNT)
export const getWriteContract = async () => {
  if (isDemoMode()) {
    if (!DEMO_PRIVATE_KEY) {
      throw new Error("Demo account is not configured.");
    }
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(DEMO_PRIVATE_KEY, provider);
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
  }

  if (!window.ethereum) {
    throw new Error("No wallet found. Please install MetaMask or use the Demo Account.");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};
