const hre = require("hardhat");
const fs = require("fs");

async function deployBase() {
  console.log(
    "------------------------------ Initial Setup Started ------------------------------"
  );
  const latestTime = Math.floor(Date.now() / 1000);
  const [owner, renter] = await hre.ethers.getSigners();
  // const network = await hre.getChainId();
  // deployedContractsv1[network] = {};

  console.log(
    "------------------------------ Initial Setup Ended ------------------------------"
  );

  console.log("--------------- Contract Deployment Started ---------------");
  const _user = [""];

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();

  await nftMarket.deployed();
  const TokenContract = await hre.ethers.getContractFactory("NFT");
  const tokenContract = await TokenContract.deploy(nftMarket.address);

  await tokenContract.deployed();

  const RentFactoryContract = await hre.ethers.getContractFactory(
    "RentFactory"
  );
  const rentFactoryContract = await RentFactoryContract.deploy();

  await rentFactoryContract.deployed();

  console.log("Contract Token Contact deployed to: ", tokenContract.address);
  console.log("Contract NFT Market Contact deployed to:", nftMarket.address);
  console.log(
    "Contract Rent Factory Contact deployed to: ",
    rentFactoryContract.address
  );

  // console.log("Contract PackageProxy deployed to: ", IOTEXPADToken.address);

  console.log(
    "------------------------------ Contract Deployment Ended ------------------------------"
  );
  console.log(
    "------------------------------ Deployment Storage Started ------------------------------"
  );

  // await hre.run("verify:verify", {
  //   address: tokenContract.address,
  //   network: hre.ethers.provider.network,
  // });
  // await hre.run("verify:verify", {
  //   address: rentFactoryContract.address,
  //   network: hre.ethers.provider.network,
  // });

  console.log(
    "------------------------------ Deployment Storage Ended ------------------------------"
  );
}

deployBase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// -------------------- Create Rent contract arguments --------------------- //
// owner.address,
// renter.address,
// "1000000000000000000",
// 1,
// tokenContract.address,
// "Wrapped SuperFunSocial",
// "WSFS",
// 1,
// latestTime + 180, // After 3 minutes
// latestTime + 900 // After 15 minutes
