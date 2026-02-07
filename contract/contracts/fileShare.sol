// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DecentralizedDrive {

    // ---------------- STRUCT ----------------
    struct File {
        uint256 id;
        string name;
        string ipfsHash;
        address owner;
        uint256 uploadedAt;
        bool allowReshare;
    }

    // ---------------- STATE VARIABLES ----------------
    uint256 private fileCounter;  //total files in that contract

    mapping(uint256 => File) private files;  //eg: file[1]={1,name,ipfs,..} means in id 1 this file is there

    mapping(address => uint256[]) private userFiles; //eg: userFiles[0xabc...]=[1,3,6] this address has access to file id - 1,3,6

    mapping(address => uint256[]) private sharedFiles;  //eg: sharedFiles[0xabc..]=[2,4] this address has been shared with file id 2,4 and now access to it

    mapping(uint256 => mapping(address => bool)) private fileAccess;   //eg: fileAccess[1][0xabc..]=true means fileid 1 can be accessed by address 0xabc..

    // ---------------- EVENTS ----------------(events are like notification)
    event FileUploaded(
        uint256 indexed fileId,
        address indexed owner,
        string ipfsHash
    );

    event FileShared(
        uint256 indexed fileId,
        address indexed from,
        address indexed to
    );

    event FileDeleted(
        uint256 indexed fileId,
        address indexed owner
    );

    // ---------------- UPLOAD FILE ----------------
    function uploadFile(
        string calldata _name,
        string calldata _ipfsHash,
        bool _allowReshare
    ) external {
        require(bytes(_ipfsHash).length > 0, "Invalid IPFS hash");

        fileCounter++;

        files[fileCounter] = File({
            id: fileCounter,
            name: _name,
            ipfsHash: _ipfsHash,
            owner: msg.sender,
            uploadedAt: block.timestamp,
            allowReshare: _allowReshare
        });

        userFiles[msg.sender].push(fileCounter);
        fileAccess[fileCounter][msg.sender] = true;

        emit FileUploaded(fileCounter, msg.sender, _ipfsHash);  //emit that event FileUploaded
    }

    // ---------------- VIEW MY FILES ----------------
    function getMyFiles() external view returns (File[] memory) {
        uint256[] memory ids = userFiles[msg.sender];
        File[] memory result = new File[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = files[ids[i]];
        }

        return result;
    }

    // ---------------- VIEW SHARED FILES ----------------
    function getSharedFiles() external view returns (File[] memory) {
        uint256[] memory ids = sharedFiles[msg.sender];
        File[] memory result = new File[](ids.length);

        for (uint256 i = 0; i < ids.length; i++) {
            result[i] = files[ids[i]];
        }

        return result;
    }

    // ---------------- SHARE FILE ----------------
    function shareFile(uint256 _fileId, address _to) external {
        require(fileAccess[_fileId][msg.sender], "No access to file");
        require(_to != address(0), "Invalid address");

        // If sender is not owner, resharing must be allowed
        if (msg.sender != files[_fileId].owner) {
            require(files[_fileId].allowReshare, "Resharing not allowed");
        }

        // Grant access - below code run only when owner of file do allowReshare is true
        fileAccess[_fileId][_to] = true;
        sharedFiles[_to].push(_fileId);

        emit FileShared(_fileId, msg.sender, _to);
    }

    // ---------------- GET FILE (OWN OR SHARED) ----------------
    function getFile(uint256 _fileId) external view returns (File memory) {
        require(fileAccess[_fileId][msg.sender], "Access denied");
        return files[_fileId];
    }

    // ---------------- CHECK ACCESS ----------------
    function hasAccess(uint256 _fileId, address _user)
        external
        view
        returns (bool)
    {
        return fileAccess[_fileId][_user];
    }

    // ---------------- DELETE FILE ----------------
    function deleteFile(uint256 _fileId) external {
        require(files[_fileId].owner == msg.sender, "Not file owner");

        // Remove owner access
        fileAccess[_fileId][msg.sender] = false;

        // Remove from owner's file list
        uint256[] storage ids = userFiles[msg.sender];
        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] == _fileId) {
                ids[i] = ids[ids.length - 1];
                ids.pop();
                break;
            }
        }

        // Delete file metadata
        delete files[_fileId];

        emit FileDeleted(_fileId, msg.sender);
    }
}
