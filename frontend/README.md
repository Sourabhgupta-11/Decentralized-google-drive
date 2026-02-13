There are 4 components:
    1. FileGrid.js is for showing all file card structure
    2. Modal.js is for share modal structure means after clicking share a modal opens - in this file this modal structure is defined
    3. Navbar.js show navbar that show connected account and logout functionality
    4. Upload.js is for uploading file 

Made a useShare.js hook that defines all sharefile related functionalities

There are 4 pages:
    1. Connect.js for connecting our metamask account to the website
    2. Home.js for uploading file, show 2 buttons: my files, shared with me
    3. MyFiles.js for showing user own files
    4. SharedFiles.js for showing files that are shared with user

Contract.js for getting contract instance that we can use to read and write in blockchain

pinata.js for uploading file to pinata and get file ipfs hash


---------------Flow-------------
1. Connect account after connecting we go to home page
2. We choose file then click upload after that Upload.js component is called to upload file to blockchain there pinata.js is called to get ipfs hash
3. We click my files button to get to the MyFiles page where we use FileGrid,Modal component and useShare hook to fetch user own files
4. similarly we click shared with me button to get files that are shared with user
5. in navbar if we click logout button we navigate to Connect page