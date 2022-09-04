const { ethers } = require("hardhat")
const fs = require("fs")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")
        updateContractAddresses()
        // updateAbi()
    }
}

// const FRONT_END_ADDRESSES_FILE =
// "../../Lesson_10_NextJS_Smart_Contract_Lottery/constants/contractAddresses.json"
// const FRONT_END_ABI_FILE = "../Lesson_10_NextJS_Smart_Contract_Lottery/constants/abi.json"

async function updateAbi() {
    console.log("Updating ABI")
    const raffle = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json))
    console.log("ABI Updated")
}

async function updateContractAddresses() {
    console.log("Updating Addresses")
    const raffle = await ethers.getContract("Raffle")
    const currentAddresses = JSON.parse(fs.readFileSync("./utils/contractAddresses.json", "utf-8"))
    const chainId = network.config.chainId.toString()
    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(raffle.address)) {
            currentAddresses[chainId].push(raffle.address)
        }
    } else {
        currentAddresses[chainId] = [raffle.address]
    }
    fs.writeFileSync("./utils/contractAddresses.json", JSON.stringify(currentAddresses))
    console.log("Addresses updated")
}

module.exports.tags = ["front"]
