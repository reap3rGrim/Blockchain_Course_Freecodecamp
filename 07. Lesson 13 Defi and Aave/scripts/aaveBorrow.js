const { ethers } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWeth")
async function main() {
    // Aave treats everything as an ERC20 Token
    await getWeth()
    const provider = ethers.getDefaultProvider("http://localhost:8545")
    const signer = await ethers.getSigner()

    // Lending Pool Address Provider 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5

    const lendingPool = await getLendingPool(signer)
    console.log(`Lending Pool Address ${lendingPool.address}`)

    // Deposit
    const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    // approve
    await approveERC20(wethTokenAddress, lendingPool.address, AMOUNT, signer)
    console.log("Depositing...")
    await lendingPool.deposit(wethTokenAddress, AMOUNT, signer.address, 0)
    console.log("Deposited!")

    let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(lendingPool, signer.address)

    // We are going to calculate the amount of DAI we can borrow
    const daiPrice = await getDAIPrice()

    const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
    console.log(`You can borrow ${amountDaiToBorrow} DAI`)
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())

    // Borrowing
    const daiTokenAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
    await borrowDai(daiTokenAddress, lendingPool, amountDaiToBorrowWei, signer.address)
    await getBorrowUserData(lendingPool, signer.address)
    await repay(amountDaiToBorrowWei, daiTokenAddress, lendingPool, signer)
    await getBorrowUserData(lendingPool, signer.address)
    // The extra ETH borrowed is due to interests which we have to pay back
}

async function approveERC20(erc20Address, spenderAddress, amountToSpend, account) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, account)
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log("Approved!")
}

async function repay(amount, daiAddress, lendingPool, account) {
    await approveERC20(daiAddress, lendingPool.address, amount, account)
    const repayTx = await lendingPool.repay(daiAddress, amount, 1, account.address)
    await repayTx.wait(1)
    console.log("Repayed!")
}

async function borrowDai(daiAddress, lendingPool, amountDaiToBorrow, account) {
    const borrowTx = await lendingPool.borrow(daiAddress, amountDaiToBorrow, 1, 0, account)
    await borrowTx.wait(1)
    console.log("You've borrowed!")
}

async function getBorrowUserData(lendingPool, account) {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
        await lendingPool.getUserAccountData(account)
    console.log(`You have total ${totalCollateralETH} worth of ETH deposited`)
    console.log(`You have total ${totalCollateralETH} worth of ETH deposited`)
    console.log(`You have total ${totalDebtETH} worth of ETH borrowed`)
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH`)
    return { totalDebtETH, availableBorrowsETH }
}

async function getDAIPrice() {
    const daiEthPricefeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        "0x773616E4d11A78F511299002da57A0a94577F1f4"
    )
    // We don't connect to a deployer account as we are not sending a transaction but
    // only reading a value
    const price = (await daiEthPricefeed.latestRoundData())[1]
    console.log(`The DAI/ETH price is ${price.toString()}`)
    return price
}

async function getLendingPool(account) {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        account
    )
    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)
    return lendingPool
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
