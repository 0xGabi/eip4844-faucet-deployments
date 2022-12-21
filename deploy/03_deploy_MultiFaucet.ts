import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const dai = await get("DaiStablecoin");
  const weth = await get("WETH9");

  const URI =
    "https://ipfs.io/ipfs/bafybeie5sae57x3nchd5ua3tgser6y5cg6jifiauaz2pjgx5hyd5c7z3pu";

  await deploy("MultiFaucet", {
    from: deployer,
    args: [dai.address, weth.address, URI],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });
};
export default func;
func.tags = ["MultiFaucet"];
func.dependencies = ["DAI", "WETH9"];
