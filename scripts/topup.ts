import { ContractTransaction } from "ethers";
import hre, { ethers } from "hardhat";
import { DaiStablecoin, WETH9, MultiFaucet } from "../typechain-types";

const resolveTx = async (tx: Promise<ContractTransaction>) => (await tx).wait();

async function main(): Promise<void> {
  const [signer] = await ethers.getSigners();

  const { deployments } = hre;

  const dai = await deployments.get("DaiStablecoin");
  const weth = await deployments.get("WETH9");
  const faucet = await deployments.get("MultiFaucet");

  const daiContract = (await ethers.getContractAt(
    "DaiStablecoin",
    dai.address,
    signer
  )) as DaiStablecoin;
  const wethContract = (await ethers.getContractAt(
    "WETH9",
    weth.address,
    signer
  )) as WETH9;
  const faucetContract = (await ethers.getContractAt(
    "MultiFaucet",
    faucet.address,
    signer
  )) as MultiFaucet;

  await resolveTx(
    daiContract.transfer(faucet.address, ethers.utils.parseEther("10000000"))
  );
  console.log("Toping up faucet with 10M DAI");

  await resolveTx(
    wethContract.deposit({ value: ethers.utils.parseEther("5") })
  );
  await resolveTx(
    wethContract.transfer(faucet.address, ethers.utils.parseEther("5"))
  );
  console.log("Toping up faucet with 5 WETH");

  await resolveTx(
    signer.sendTransaction({
      to: faucet.address,
      value: ethers.utils.parseEther("5"),
    })
  );
  console.log("Toping up faucet with 5 ETH");

  const avaiableDrips = await faucetContract.availableDrips();
  console.log("Available drips: ", avaiableDrips.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
