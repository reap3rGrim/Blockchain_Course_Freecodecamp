const { ethers, network } = require("hardhat")
const {
    developmentChains,
    NEW_STORE_VALUE,
    FUNC,
    proposalDescription,
    VOTING_DELAY,
    proposalsFile,
    MIN_DELAY,
} = require("../helper-hardhat-config")
const { fs } = require("fs")
const { moveBlocks } = require("../utils/move-blocks")
const { moveTime } = require("../utils/move-time")
module.exports = async function () {
    const args = [NEW_STORE_VALUE]
    const box = await ethers.getContract("Box")
    const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, args)
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(proposalDescription))
    const governor = await ethers.getContract("GovernorContract")
    console.log("Queuing")
    const queueTx = await governor.queue([box.address], [0], [encodedFunctionCall], descriptionHash)

    await queueTx.wait(1)
    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY + 1)
        await moveBlocks(1)
    }

    console.log(`Executing`)
    const executeTx = await governor.execute(
        [box.address],
        [1],
        [encodedFunctionCall],
        descriptionHash
    )
    await executeTx.wait(1)
    const boxNewValue = await box.retrieve()
    console.log(`New Box Value is ${boxNewValue.toString()}`)
}
