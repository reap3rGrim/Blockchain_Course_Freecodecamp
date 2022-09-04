const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          // We're gonna test the constructor initially
          let fundMe
          let deployer
          let mockV3Aggregator
          const sendValue = ethers.utils.parseEther("1")
          beforeEach(async function () {
              // const accounts = await ethers.getSigners()
              // getSigners returns everything in accounts section of your config
              // const accountZero = account[0]
              // We're deploying using hardhat-deploy here
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"]) // the fixture tag allows to run deploys with a tag
              fundMe = await ethers.getContract("FundMe", deployer)
              mockV3Aggregator = await ethers.getContract(
                  "MockV3Aggregator",
                  deployer
              )
          })

          describe("constructor", async function () {
              it("sets the aggregator address correctly", async function () {
                  const response = await fundMe.priceFeed()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          describe("fund", async () => {
              it("Fails if you don't send enough ETH", async () => {
                  //for failing we use expect from waffle
                  await expect(fundMe.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })

              it("updated the amount funded data structure", async function () {
                  await fundMe.fund({ value: sendValue })
                  const response = await fundMe.addressToAmountFunded(deployer)
                  assert.equal(response.toString(), sendValue.toString())
              })

              it("Adds funder to array of funders", async () => {
                  await fundMe.fund({ value: sendValue })
                  const funder = await fundMe.funders(0)
                  assert.equal(funder, deployer)
              })
          })

          describe("withdraw", async () => {
              beforeEach(async () => {
                  await fundMe.fund({ value: sendValue })
              })

              it("withdraw ETH from a single founder", async function () {
                  // Arrange
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)

                  //.mul and .add are from big numbers

                  // finding gas costs using transactionReceipt
                  // create a breakpoint here and look at the variables
                  // run yarn hardhat test on JS Debugger terminal

                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // Assert
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance.add(startingDeployerBalance),
                      endingDeployerBalance.add(gasCost).toString()
                  )
              })
              it("allows us to withdraw with multiple funders", async function () {
                  const accounts = await ethers.getSigners()
                  for (let i = 1; i < 6; i++) {
                      const fundMeConnectedContract = await fundMe.connect(
                          accounts[i]
                      )
                  }

                  await fundMe.fund({ value: sendValue })
                  const startingFundMeBalance =
                      await fundMe.provider.getBalance(fundMe.address)
                  const startingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)

                  // Act

                  const transactionResponse = await fundMe.withdraw()
                  const transactionReceipt = await transactionResponse.wait(1)
                  const { gasUsed, effectiveGasPrice } = transactionReceipt
                  const gasCost = gasUsed.mul(effectiveGasPrice)
                  const endingFundMeBalance = await fundMe.provider.getBalance(
                      fundMe.address
                  )
                  const endingDeployerBalance =
                      await fundMe.provider.getBalance(deployer)
                  // Assert
                  assert.equal(endingFundMeBalance, 0)
                  assert.equal(
                      startingFundMeBalance
                          .add(startingDeployerBalance)
                          .toString(),
                      endingDeployerBalance.add(gasCost).toString()
                  )

                  //Make sure the funders are reset properly
                  await expect(fundMe.funders(0)).to.be.reverted
                  for (i = 1; i < 6; i++) {
                      assert.equal(
                          await fundMe.addressToAmountFunded(
                              accounts[i].address
                          ),
                          0
                      )
                  }
              })

              // it.only("allows us to withdraw with multiple funders", async function () {
              //     const accounts = await ethers.getSigners()
              //     for (let i = 1; i < 6; i++) {
              //         const fundMeConnectedContract = await fundMe.connect(
              //             accounts[i]
              //         )
              //     }

              //     await fundMe.fund({ value: sendValue })
              //     const startingFundMeBalance = await fundMe.provider.getBalance(
              //         fundMe.address
              //     )
              //     const startingDeployerBalance = await fundMe.provider.getBalance(
              //         deployer
              //     )

              //     // Act

              //     const transactionResponse = await fundMe.cheaperWithdraw()
              //     const transactionReceipt = await transactionResponse.wait(1)
              //     const { gasUsed, effectiveGasPrice } = transactionReceipt
              //     const gasCost = gasUsed.mul(effectiveGasPrice)
              //     const endingFundMeBalance = await fundMe.provider.getBalance(
              //         fundMe.address
              //     )
              //     const endingDeployerBalance = await fundMe.provider.getBalance(
              //         deployer
              //     )
              //     // Assert
              //     assert.equal(endingFundMeBalance, 0)
              //     assert.equal(
              //         startingFundMeBalance.add(startingDeployerBalance).toString(),
              //         endingDeployerBalance.add(gasCost).toString()
              //     )

              //     //Make sure the funders are reset properly
              //     await expect(fundMe.funders(0)).to.be.reverted
              //     for (i = 1; i < 6; i++) {
              //         assert.equal(
              //             await fundMe.addressToAmountFunded(accounts[i].address),
              //             0
              //         )
              //     }
              // })

              it("Only allows the owner to withdraw", async () => {
                  const accounts = await ethers.getSigners()
                  const attacker = accounts[1]
                  const attackerConnectedContract = await fundMe.connect(
                      attacker
                  )
                  await expect(
                      attackerConnectedContract.withdraw()
                  ).to.be.revertedWithCustomError(fundMe, "FundMe__NotOwner")
              })
          })
      })
