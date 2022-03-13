// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./base/IERC721URIStorage.sol";
import "./ERC721TokenWrapper.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Rent {
    address payable public owner;
    address payable public renter;
    ERC721Wrapper public wrappedToken;
    uint256 public tokenId;
    using SafeMath for uint256;
    uint256 public rentingAmount;

    bool public active = false;

    // Unix timestamps
    uint256 public startTime;
    uint256 public expirationTime;

    constructor(
        address payable _owner,
        ERC721Wrapper _wrappedToken,
        uint256 _tokenId,
        uint256 _rentingAmount,
        uint256 _startTime,
        uint256 _expirationTime
    ) {
        owner = _owner;
        tokenId = _tokenId;
        startTime = _startTime;
        expirationTime = _expirationTime;
        wrappedToken = _wrappedToken;
        rentingAmount = _rentingAmount;
    }

    function rentToken(address payable _renter, uint256 _rentingAmount)
        external
        payable
    {
        require(msg.sender != owner, "Owner can not rent NFT!");
        require(
            block.timestamp > startTime,
            "Renting for this NFT is not started yet!"
        );
        require(address(this).balance >= _rentingAmount, "Not enough balance!");
        renter = _renter;
        rentingAmount = _rentingAmount;

        payable(owner).send(_rentingAmount);
        wrappedToken.deposit(tokenId, address(owner), address(_renter));
    }

    function withdrawToken() external onlyOwner {
        require(
            block.timestamp > expirationTime,
            "Contract is not expired yet!"
        );
        wrappedToken.withdraw(tokenId, address(owner));
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }
}
