const { getNamedAccounts, ethers } = require("hardhat")
const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    // There seems to be error while forking with localhost and hardhat
    // Run hardhat node before running the scripts so as to connect with the providers
    // https://ethereum.stackexchange.com/questions/110931/hardhat-mainnet-forking-and-impersonating-an-account-isnt-working-help#comment133879_110931
    const provider = ethers.getDefaultProvider("http://localhost:8545")

    const signer = await ethers.getSigner()
    // const deployer = await getNamedAccounts()

    const iWeth = await ethers.getContractAt(
        "IWeth",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        signer
    )
    const tx = await iWeth.deposit({ value: AMOUNT })
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(signer.address)
    // console.log(`Got ${ethers.utils.formatEther(wethBalance.toString(), "ether")} WETH `)
}

module.exports = { getWeth, AMOUNT }
