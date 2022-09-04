const { ethers, network } = require("hardhat")
const {
    developmentChains,
    NEW_STORE_VALUE,
    FUNC,
    proposalDescription,
    VOTING_DELAY,
    proposalsFile,
} = require("../helper-hardhat-config")
const { fs } = require("fs")
const { moveBlocks } = require("../utils/move-blocks")

async function main(args, FUNC) {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers.getContract("Box")

    const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, args)
    console.log(encodedFunctionCall)
    console.log(`Proposing ${FUNC} on ${box.address} with ${args}`)
    console.log(`Proposal description: \n ${proposalDescription}`)

    const proposeTx = await governor.propose(
        [box.address],
        [3],
        [encodedFunctionCall],
        proposalDescription
    )
    const proposalReceipt = await proposeTx.wait(1)

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1)
    }
    const proposalId = await proposalReceipt.events[0].args.proposalId.toString()
    console.log(`The proposal Id of the given proposal is ${proposalId}`)
    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf-8"))
    proposals[network.config.chainId.toString()].push(proposalId)
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals))
}

main([NEW_STORE_VALUE], FUNC)
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(0)
    })
