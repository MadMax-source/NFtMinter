// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts@5.3.0/token/ERC721/ERC721.sol";
import {ERC721Burnable} from "@openzeppelin/contracts@5.3.0/token/ERC721/extensions/ERC721Burnable.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts@5.3.0/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721Pausable} from "@openzeppelin/contracts@5.3.0/token/ERC721/extensions/ERC721Pausable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts@5.3.0/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts@5.3.0/access/Ownable.sol";

contract MyToken is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, Ownable, ERC721Burnable {
    uint256 public nextTokenId;
    uint256 public mintPrice = 0 ether; // Optional: charge to mint

    constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
    {}

    /// @notice Public mint function (anyone can mint)
    function mint(string memory uri) external payable {
        require(msg.value >= mintPrice, "Insufficient ETH sent");
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /// @notice Owner-only mint function
    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyOwner
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /// @notice Pause transfers
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpause transfers
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice Set new mint price
    function setMintPrice(uint256 price) external onlyOwner {
        mintPrice = price;
    }

    /// @notice Withdraw ETH from contract
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // ===== Overrides =====

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // 🧨 Removed _burn override — not needed
}