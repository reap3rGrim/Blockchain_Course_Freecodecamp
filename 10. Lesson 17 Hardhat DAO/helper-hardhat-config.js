const { ethers } = require("hardhat")

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "711",
        callbackGasLimit: "500000",
        interval: "30",
    },
    31337: {
        name: "hardhat",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "500000",
        interval: "30",
    },
}

const developmentChains = ["hardhat", "localhost"]
const MIN_DELAY = 3600

const VOTING_DELAY = 1
const VOTING_PERIOD = 3
const QUORUM_PERCENTAGE = 4
const FUNC = "store"
const NEW_STORE_VALUE = 77
const proposalsFile = "./proposals.json"
const proposalDescription = "Storing 77 in the box"

// const FRONT_END_ABI_FILE = "../../Lesson 10 NextJS Smart Contract Lottery/constants/abi.json"

module.exports = {
    networkConfig,
    developmentChains,
    MIN_DELAY,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
    FUNC,
    NEW_STORE_VALUE,
    proposalDescription,
    proposalsFile,
}
