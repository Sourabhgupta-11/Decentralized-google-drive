import "dotenv/config";
import { defineConfig } from "hardhat/config";
import HardhatIgnitionEthersPlugin from "@nomicfoundation/hardhat-ignition-ethers";


export default defineConfig({
  plugins: [HardhatIgnitionEthersPlugin],
  solidity: {
    version: "0.8.28",
  },
  networks: {
    sepolia: {
        type: "http",
        url: process.env.SEPOLIA_RPC_URL!,   
        accounts: [process.env.SEPOLIA_PRIVATE_KEY!],
    },
  }
});