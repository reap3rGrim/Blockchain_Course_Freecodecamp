// // Try to get a 100% coverage in yarn hardhat coverage

// const { assert, expect } = require("chai")
// const { network, deployements, ethers, getNamedAccounts } = require("hardhat")
// const { developmentChains } = require("../../helper-hardhat-config")

// !developmentChains.includes(network.name)
//     ? describe.skip
//     : describe("Nft Marketplace Tests", function () {
//           //   let nftMarketplace, basicNft, deployer, player
//           //   const PRICE = ethers.utils.parseEther("0.1")
//           //   const TOKEN_ID = 0
//           //   beforeEach(async function () {
//           //       deployer = (await getNamedAccounts()).deployer
//           //       const accounts = await ethers.getSigners()
//           //       player = accounts[1]
//           //       //   player = (await getNamedAccounts()).player
//           //       await deployements.fixtures(["all"])
//           //       nftMarketplace = await ethers.getContract("NftMarketplace")
//           //       basicNft = await ethers.getContract("BasicNft")
//           //       await basicNft.mintNft()
//           //       await basicNft.approve(nftMarketplace.address, TOKEN_ID)
//           //   })
//           //   it("Lists and can be bought", async function () {
//           //       await nftMarketplace.listItem(basicNft.address, TOKEN_ID, PRICE)
//           //       const playerConnectedNftMarketplace = nftMarketplace.connect(player)
//           //       await playerConnectedNftMarketplace.buyItem(basicNft.address, TOKEN_ID, {
//           //           value: PRICE,
//           //       })
//           //       const newOwner = await basicNft.ownerOf(TOKEN_ID) //NFTs have an ownerOf function
//           //       const deployerProceeds = await nftMarketplace.getProceeds(deployer)
//           //       assert(newOwner.toString() == player.address)
//           //       assert(deployerProceeds.toString() == PRICE.toString())
//           //   })
//       })
