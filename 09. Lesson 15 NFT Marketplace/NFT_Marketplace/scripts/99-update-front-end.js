const { ethers, network } = require("hardhat")
const fs = require("fs")

const frontEndContractsFile =
    "./../nextjs-nft-marketplace-moralis-fcc/constants/networkMapping.json"

console.log("Working")
async function main() {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating Front End...")
        await updateContractAddresses()
    }
}

async function updateContractAddresses() {
    try {
        const nftMarketplace = await ethers.getContract("NftMarketplace")
        const chainId = network.config.chainId || "31337"
        const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
        if (chainId in contractAddresses) {
            if (!contractAddresses[chainId]["NftMarketplace"].includes(nftMarketplace.address)) {
                contractAddresses[chainId]["NftMarketplace"].push(nftMarketplace.address)
            } else {
                contractAddresses[chainId] = { NftMarketplace: [nftMarketplace.address] }
            }
            fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
        }
    } catch (e) {
        console.log(e)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

module.exports.tags = ["all", "frontend"]
