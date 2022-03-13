// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Rent.sol";
import "./ERC721TokenWrapper.sol";
import "./base/IERC721URIStorage.sol";

contract RentFactory is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _contractIds;
    mapping(uint256 => address) rentContracts;

    event ContractCreated(uint256, address);

    /**
      Creates new rent contract
      @param owner Account address of owner
      @param price price of token with interest rate
      @param tokenAddress Token contract address
      @param tokenName Name of token
      @param tokenSymbol Symbol of token
      @param tokenId Id of token
      @param startTime UTC timestamp of the start date of the contract
      @param expirationTime UTC timestamp of the end date of the contract
      @return address New contract address
    */
    function createContract(
        address payable owner,
        uint256 price,
        IERC721URIStorage tokenAddress,
        string memory tokenName,
        string memory tokenSymbol,
        uint256 tokenId,
        uint256 startTime,
        uint256 expirationTime
    ) public returns (address) {
        _contractIds.increment();
        uint256 newItemId = _contractIds.current();
        ERC721Wrapper _wrappedToken = new ERC721Wrapper(
            tokenAddress,
            tokenName,
            tokenSymbol
        );
        address _address = address(
            new Rent(
                owner,
                _wrappedToken,
                tokenId,
                price,
                startTime,
                expirationTime
            )
        ); // Created Rent contract.
        rentContracts[newItemId] = address(_address);
        emit ContractCreated(newItemId, _address);
    }
}
