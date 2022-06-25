// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract LERC721 is ERC721A, Ownable, ReentrancyGuard {

  enum LeaseState {
    notLeased,
    forLease,
    isLeased
  }

  struct TokenLease{
    LeaseState state;
    uint256 price;
    uint256 time;
  }

  struct LeaseParams {
    address current; // current address
    address ret; // return address
  }

  mapping(uint256 => TokenLease) public tokenLeaseMap;

  // Token Data
  uint256 public MAX_TOKENS = 5555;
  uint256 public MAX_PUB_MINTS_PER_TX = 2;

  // Contract Data
  string public _baseTokenURI;
  bool public mainSaleActive = false;

  constructor() ERC721A("LERC721", "LERC721") {}

  function setBaseURI(string memory baseURI) public onlyOwner {
      _baseTokenURI = baseURI;
  }

  function _baseURI() internal view virtual override returns (string memory) {
      return _baseTokenURI;
  }

  function flipMainSaleState() public onlyOwner {
      mainSaleActive = !mainSaleActive;
  }

  function mintTokens(uint256 numberOfTokens)
      external
      nonReentrant
  {
      require(mainSaleActive, "Sale must be active to mint token");
      require(
          numberOfTokens <= MAX_PUB_MINTS_PER_TX,
          "Can only mint max purchase of tokens at a time"
      );
      require(
          totalSupply() + numberOfTokens <= MAX_TOKENS,
          "Purchase would exceed max supply of Tokens"
      );

      _safeMint(msg.sender, numberOfTokens);
  }

  /* Lease Functionality */
  function leaseToken(uint256 tokenId) public payable {

  }

  function setTokenLease(uint256 tokenId, bool setLease, uint256 price, uint256 time) public {
    // check token ownership
    require(ownerOf(tokenId) == msg.sender);
    LeaseState leaseState = setLease ? LeaseState.forLease : LeaseState.isLeased;
    TokenLease memory tokenLease = TokenLease(leaseState, price, time);
    tokenLeaseMap[tokenId] = tokenLease;
  }

  // @dev called by oracle to terminate a lease
  function TerminateLease() public {

  } 

}
