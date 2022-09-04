const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()

        it("Should start with a favourite number of 0", async function () {
            const currentValue = await simpleStorage.retrieve()
            const expectedValue = "0"
            //you can use expect, assert from chai
            assert.equal(currentValue.toString().to.equal(expectedValue))
        })
        it("Should update when we call store", async () => {
            const expectedValue = "7"
            const transactionResponse = await simpleStorage.store(expectedValue)
            await transactionResponse.wait(1)
            const currentValue = await simpleStorage.retrieve()
            assert.equal(currentValue.toString(), expectedValue)
        })
    })
})
