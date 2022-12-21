// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract DaiStablecoin is ERC20, ERC20Permit {
    constructor() ERC20("Dai Stablecoin", "DAI") ERC20Permit("Dai Stablecoin") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
