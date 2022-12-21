import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import { node_url, account, accounts } from "./utils/network";

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: node_url("localhost"),
      accounts: accounts(),
    },
    eip4844: {
      url: node_url("eip4844"),
      accounts: account("eip4844"),
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: "0.5.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 0,
  },
};

export default config;
