# Decentralized Drive

A full-stack decentralized file storage and sharing platform built on **Ethereum** and **IPFS**. Users can upload files, control access with on-chain permissions, and share with specific wallet addresses — no servers, no accounts, no middlemen.

**Live demo →** [Decentralized-Drive](https://decentralized-drive-seven.vercel.app/) &nbsp;|&nbsp; Try it without MetaMask using the built-in **Demo Account**.

---

## What it does

- **Upload files to IPFS** via Pinata — files are distributed across the decentralized web, not stored on any single server
- **On-chain file registry** — every upload is recorded as an Ethereum transaction, making the file list tamper-proof and permanently auditable
- **Granular access control** — share any file with a specific wallet address; the smart contract enforces who can view it, with no intermediary
- **Reshare permissions** — decide at upload time whether recipients can further share the file
- **One-click revocation** — remove access or delete files at any time, direct on-chain

## Tech stack

| Layer | Technology |
|---|---|
| Smart contract | Solidity · Hardhat · Ignition |
| Network | Ethereum Sepolia testnet |
| Decentralized storage | IPFS via Pinata |
| Frontend | React · ethers.js v6 |
| Styling | CSS custom properties · Space Grotesk · JetBrains Mono |

## Running locally

```bash
# 1. Clone
git clone https://github.com/your-username/decentralized-drive.git
cd decentralized-drive

# 2. Install frontend deps
cd frontend && npm install

# 3. Add environment variables
frontend/.env
# Fill in REACT_APP_CONTRACT_ADDRESS, REACT_APP_PINATA_JWT,
# REACT_APP_DEMO_PRIVATE_KEY, REACT_APP_RPC_URL

# 4. Start the app
npm start
```

The contract is already deployed on Sepolia at `0x6BA49117db1a30a94C1422c3C27852BF420809fd` — no local chain needed.

## Smart contract

`fileShare.sol` manages three core operations:

- `uploadFile(name, ipfsHash, allowReshare)` — registers a file under the caller's address
- `shareFile(fileId, recipient)` — grants a wallet address read access
- `deleteFile(fileId)` — removes the file record from the caller's registry

Access is enforced by the contract itself using `msg.sender` — no backend auth, no session tokens.

## Demo mode

Visitors without MetaMask can click **"Continue with Demo Account"** on the connect screen to explore the full app using a pre-funded Sepolia wallet provided by the site. No wallet extension or real ETH required.

---

*Portfolio project · Ethereum Sepolia testnet · Not for production use*
