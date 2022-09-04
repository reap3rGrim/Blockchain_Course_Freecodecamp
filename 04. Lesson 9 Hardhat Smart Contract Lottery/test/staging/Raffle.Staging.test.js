/*
TO CHECK THIS TEST YOU'LL NEED TO 
1. GET THE SUB ID FOR CHAINLINK VRF 
2. DEPLOY THE CONTRACT WITH THE SUBID 
3. REGISTER THE CONTRACT WITH CHAINLINK VRF AND THE SUBID 
4. REGISTER THE CONTRACT WITH CHAINLINK KEEPERS
5. RUN THE STAGING TESTS
*/

const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async () => {
          let raffle, raffleEntranceFee, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfilRandomWords", function () {
              it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async () => {
                  //enter the raffle
                  const startingTimeStamp = await raffle.getLatestTimeStamp()
                  const accounts = await ethers.getSigners()
                  // We setup the listener because we want the raffle to work by itself and this is just a listener
                  await new Promise(async (resolve, reject) => {
                      // Setup the listener before the raffle
                      raffle.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          //   resolve()
                          try {
                              // Making sure the raffle is reset
                              const recentWinner = await raffle.getRecentWinner()
                              const raffleState = await raffle.getRaffleState()
                              // Accounts[0] as the only player is the deployer
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = await raffle.getLatestTimeStamp()

                              await expect(raffle.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), accounts[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(raffleEntranceFee).toString()
                              )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (e) {
                              reject(e)
                          }
                      })

                      // Enter the lottery
                      await raffle.enterRaffle({ value: raffleEntranceFee })
                      const winnerStartingBalance = await accounts[0].getBalance()
                      // This code WONT complete until out listerner has finished listening
                  })
              })
          })
      })
