const { ethers } = require("hardhat")
const { MIN_DELAY } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("Deploying Time Lock Contract...")

    const timeLock = await deploy("TimeLock", {
        from: deployer,
        log: true,
        args: [MIN_DELAY, [], []],
    })

    log(`Deployed Time Lock at address ${timeLock.address}`)
    log("---------------------------------------------------------------------------------")
}
