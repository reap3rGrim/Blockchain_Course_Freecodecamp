const { ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const box = await deploy("Box", {
        from: deployer,
        log: true,
        args: [],
    })

    log(`Deployed Box at address ${box.address}`)
    log("---------------------------------------------------------------------------------")

    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContract("Box")
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)

    await transferOwnerTx.wait(1)
    log("Transferred ownership to TimeLock Contract")
    log("---------------------------------------------------------------------------------")
}
