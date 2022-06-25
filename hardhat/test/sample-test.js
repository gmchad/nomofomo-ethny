const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lease Test", function () {

  let Contract;
  let contract;

  beforeEach(async function () {
    [owner, ...addrs] = await ethers.getSigners();

    Contract = await ethers.getContractFactory("LERC721");
    contract = await Contract.deploy();
  })

  describe("Simple Test", function () {
    it("should run", async function () {

      const time = 3600; // 1 hr

      await contract.flipMainSaleState();
      await contract.mintTokens(1);
      await contract.setTokenLease(0, true, ethers.utils.parseEther("1"), 3600);

      console.log(await contract.tokenLeaseMap(0));

    });
  });
  

});
