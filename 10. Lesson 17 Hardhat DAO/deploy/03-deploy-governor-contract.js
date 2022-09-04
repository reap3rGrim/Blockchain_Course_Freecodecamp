const { ethers } = require("hardhat")
const { VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const governanceToken = await ethers.getContract("GovernanceToken")
    const timeLock = await ethers.getContract("TimeLock")
    log("Deploying Governor Contract...")
    args = [
        governanceToken.address,
        timeLock.address,
        VOTING_DELAY,
        VOTING_PERIOD,
        QUORUM_PERCENTAGE,
    ]
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        log: true,
        args: args,
    })
}
