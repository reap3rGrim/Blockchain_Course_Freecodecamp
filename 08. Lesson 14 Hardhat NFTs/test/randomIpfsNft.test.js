const { ethers, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip()
    : describe("Random IPFS tests", function () {
          beforeEach(async () => {
              deployer = await getNamedAccounts()
              await deployments.fixture(["all"])
              randomIpfsNft = await ethers.getContract("RandomIpfsNft")
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
          })

          describe("constructor", function () {
              it("initializes the values correctly", async () => {
                  const dogTokenUriZero = await randomIpfsNft.getDogTokenUris(0)
                  assert(dogTokenUriZero.includes("ipfs://"))
              })
              describe("requestNft", () => {
                  it("fails if payment isn't sent with the request", async function () {
                      await expect(randomIpfsNft.requestNft()).to.be.revertedWithCustomError(
                          randomIpfsNft,
                          "RandomIpfsNft__NeedMoreETHSent"
                      )
                  })
                  it("emits an event and kicks off a random word request", async function () {
                      const fee = await randomIpfsNft.getMintFee()
                      await expect(randomIpfsNft.requestNft({ value: fee.toString() })).to.emit(
                          randomIpfsNft,
                          "NftRequested"
                      )
                  })
              })
              //   describe("fulfillRandomWords", () => {
              //       it("mints NFT after random number is returned", async function () {
              //           await new Promise(async (resolve, reject) => {
              //               randomIpfsNft.once("NftMinted", async () => {
              //                   try {
              //                       const tokenUri = await randomIpfsNft.tokenURI("0")
              //                       const tokenCounter = await randomIpfsNft.getTokenCounter()
              //                       assert.equal(tokenUri.toString().includes("ipfs://"), true)
              //                       assert.equal(tokenCounter.toString(), "1")
              //                       resolve()
              //                   } catch (e) {
              //                       console.log(e)
              //                       reject(e)
              //                   }
              //               })
              //               try {
              //                   const fee = await randomIpfsNft.getMintFee()
              //                   const requestNftResponse = await randomIpfsNft.requestNft({
              //                       value: fee.toString(),
              //                   })
              //                   const requestNftReceipt = await requestNftResponse.wait(1)
              //                   await vrfCoordinatorV2Mock.fulfillRandomWords(
              //                       requestNftReceipt.events[1].args.requestId,
              //                       randomIpfsNft.address
              //                   )
              //               } catch (e) {
              //                   console.log(e)
              //                   reject(e)
              //               }
              //           })
              //       })
              //   })
          })
      })
