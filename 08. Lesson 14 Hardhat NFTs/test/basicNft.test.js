const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip()
    : describe("Unit Tests for BasicNFT.sol", function () {
          let basicNft
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["basic"])
              basicNft = await ethers.getContract("BasicNft", deployer)
          })

          describe("Constructor", function () {
              it("initializes the NFT Correctly", async function () {
                  const tokenCounter = await basicNft.getTokenCounter()
                  assert.equal(tokenCounter, "0")
                  const name = await basicNft.name()
                  assert.equal(name, "Doggie")
                  const symbol = await basicNft.symbol()
                  assert.equal(symbol, "DOG")
              })
          })

          describe("Mint NFT", () => {
              it("Allows users to mint an NFT, and updates appropriately", async function () {
                  const txResponse = await basicNft.mintNft()
                  await txResponse.wait(1)
                  const tokenURI = await basicNft.tokenURI(0)
                  const tokenCounter = await basicNft.getTokenCounter()

                  assert.equal(tokenCounter.toString(), "1")
                  assert.equal(tokenURI, await basicNft.TOKEN_URI())
              })
          })
      })
