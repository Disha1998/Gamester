// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./base/IERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract ERC721Wrapper is ERC721Enumerable, ReentrancyGuard {
    /**
     * @dev Returns the address of underlying ERC721.
     */
    mapping(uint256 => address) owners;
    IERC721URIStorage public underlyingERC721;

    event  Deposit(address indexed user, uint256 tokenId);
    event  Withdrawal(address indexed user, uint256 tokenId);

    constructor(
        IERC721URIStorage underlyingERC721_,
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) {
        require(address(underlyingERC721_) != address(0), "ERC721Wrapper: underlyingERC721_ cannot be zero");

        underlyingERC721 = underlyingERC721_;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        return underlyingERC721.tokenURI(tokenId);
    }

    /**
     * @dev Deposits/wraps `tokenId` of underlying token.
     */
    function deposit(uint256 tokenId, address _owner, address _renter) external nonReentrant {
        underlyingERC721.safeTransferFrom(
            address(_owner),
            address(this),
            tokenId,
            ""
        );

        _mint(address(_renter), tokenId);
        owners[tokenId] = address(_owner);

        emit Deposit(address(_owner), tokenId);
    }

    /**
     * @dev Withdraws/unwraps `tokenId` of underlying token.
     */
    function withdraw(uint256 tokenId, address _account) external nonReentrant {
        _withdraw(address(_account), tokenId);
    }

    function _withdraw(address account, uint256 tokenId) internal {
        require(owners[tokenId] == account, "ERC721Wrapper: caller is not owner nor approved");

        _burn(tokenId);

        underlyingERC721.safeTransferFrom(
            address(this),
            account,
            tokenId,
            ""
        );

        emit Withdrawal(account, tokenId);
    }



     function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return (
            bytes4(
                keccak256(
                    "onERC721Received(address,address,uint256,bytes)"
                )
            )
        );
    }
}