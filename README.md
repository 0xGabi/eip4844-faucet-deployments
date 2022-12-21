# EIP4844 Faucet Deployments

This repository contains the deployment scripts for the EIP4844 Faucet.

To deploy contracts run:

```shell
npx hardhat deploy --network eip4844
```

To topup the faucet run:

```shell
npx hardhat run scripts/topup.ts --network eip4844
```

## Deployment addresses

| Network  | DAI                                        | WETH9                                      | MultiFaucet                                |
| -------- | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| Devnet 3 | 0xac6e29F8DF22Ebbd22CB089f52558760F3ba4247 | 0x0bD9060153E7CA86341E9B7D53df2bc0eC51B985 | 0x04F1e772E19234aCF03A8A9BC72d0308AAaFEB07 |
