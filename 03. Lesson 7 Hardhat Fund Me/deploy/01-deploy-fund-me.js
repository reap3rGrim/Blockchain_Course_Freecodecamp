module.exports = async ({ getNamedAccounts, deployments }) => {
    // getNamedAccounts is a way to get the account from NamedAccounts
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const { network } = require("hardhat")
    const chainId = network.config.chainId
    let ethUsdPriceFeedAddress
    const {
        networkConfig,
        developmentChains,
    } = require("../helper-hardhat-config")
    const { verify } = require("../utils/verify")
    //if chainId is X use address Y
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    const args = [ethUsdPriceFeedAddress]
    //We'll mock for localhost or hardhat network
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // for the price feed
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    log("-------------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]
