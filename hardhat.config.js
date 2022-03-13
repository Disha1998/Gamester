require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const fs = require("fs");
const privateKey = process.env.PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
// const projectId = "E535Y3ehsgg9w7EuyjR9FKxPZ7d0HzQa"
const projectId = process.env.PROJECT_ID;

module.exports = {
  solidity: "0.8.4",
  networks: {
    matic: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
