const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// const { storeImages } = require("../utils/uploadToPinata")
// const imagesLocation = "./images/randomNft"

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // const imagesLocation = "./images/randomNft/"
    let tokenUris = [
        "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
        "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d",
        "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
    ]

    const FUND_AMOUNT = "10000000000000000000" // 10 LINK

    // const imageUris = [
    //     "ipfs://QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8",
    //     "ipfs://QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU",
    //     "ipfs://QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW",
    // ]

    const metadataTemplate = {
        name: "",
        description: "",
        image: "",
        attributes: [
            {
                trait_type: "Cuteness",
                value: 100,
            },
        ],
    }

    let vrfCoordinatorV2Address, subscriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const tx = await vrfCoordinatorV2Mock.createSubscription()
        const txReceipt = await tx.wait(1)
        subscriptionId = txReceipt.events[0].args.subId
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
        // console.log(subscriptionId)
        // subscriptionId = "1"
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
        subscriptionId = networkConfig[chainId].subscriptionId
    }

    log("----------------------------------------------------")
    // await storeImages(imagesLocation)
    const args = [
        vrfCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId].gasLane,
        networkConfig[chainId].callbackGasLimit,
        tokenUris,
        networkConfig[chainId].mintFee,
    ]

    async function handleTokenUris() {
        return tokenUris
        // store the image in IPFS
        // store the metadata in IPFS
        //     const {response : imagesUploadResponses, files } = await storeImages(imagesLocation)
        //     for (imagesUploadResponsesIndex in imagesUploadResponses){
        //         let tokenUriMetadata = (...metadataTemplate)
        //         tokenUriMetadata.name = files(imagesUploadResponsesIndex).replace(".png", "")
        //         tokenUriMetadata.description = `An adorable ${tokenUriMetadata} pup!`
        //         tokenUriMetadata.image = `ipfs://${imagesUploadResponses[imagesUploadResponsesIndex].IpfsHash}`
        //         console.log(`Uploading ${tokenUriMetadata.name}`)
        //     }
    }
    const randomIpfsNft = await deploy("RandomIpfsNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("----------------------------------------------------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(randomIpfsNft.address, arguments)
    }
}

module.exports.tags = ["all", "randomipfs", "main"]
