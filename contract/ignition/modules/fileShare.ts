import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";  //helps us to create a module

export default buildModule("fileShareModulev1", (m) => {  
  const fileShareContract = m.contract("DecentralizedDrive");  
  return { fileShareContract };
});