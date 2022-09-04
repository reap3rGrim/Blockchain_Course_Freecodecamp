const { ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log(`Deploying Governance Token...`)
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: 1,
    })

    log(`Deployed Governance Token at ${governanceToken.address}`)

    await delegate(governanceToken.address, deployer)
    log("Delegated!")
    log("---------------------------------------------------------------------------------")
}

// We want to delegate the tokens to a deployer
// 0 Checkpoints means the tokens have not been delegated

const delegate = async function (governanceTokenAddress, delegatedAccount) {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
    const tx = await governanceToken.delegate(delegatedAccount)
    await tx.wait(1)
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}
