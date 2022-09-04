const index = 0
const { network, ethers } = require("hardhat")
const { proposalsFile, developmentChains, VOTING_PERIOD } = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks")
const { fs } = require("fs")

async function main(proposalIndex) {
    // const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf-8"))
    // const proposalId = proposals[network.config.chainId][proposalIndex]
    const proposalId = "312519656019144926462044116924670671382147098327362361293749749109720283829"

    const voteWay = 1
    const governor = await ethers.getContract("GovernorContract")
    const reason = "demo"

    const voteTxResponse = await governor.castVoteWithReason(proposalId, voteWay, reason)
    await voteTxResponse.wait(1)
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }
    console.log("Voted! Ready to proceed!")
}

main(index)
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(0)
    })
