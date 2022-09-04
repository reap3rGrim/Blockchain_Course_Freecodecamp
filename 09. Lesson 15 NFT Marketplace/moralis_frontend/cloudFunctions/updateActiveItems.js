// Create a new table called "Active Items"
// Add items when they are listed on the marketplace
// Remove them when they are bought or cancelled

Moralis.Cloud.afterSave("ItemListed", async (request) => {
    // Every event gets triggered twice, once on unconfirmed and once on confirmed
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info("Looking for confirmed Tx...")
    if (confirmed) {
        logger.info("Found Item!")
        const ActiveItem = Moralis.Object.extend("ActiveItem")

        const query = new Moralis.Query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("price", request.object.get("price"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        query.equalTo("seller", request.object.get("seller"))
        const alreadyListedItem = await query.first()
        // logger.info(`Deleting already listed ${request.object.get("objectId")}`)
        // await alreadyListedItem.destroy()
        // if (alreadyListedItem) {
        //     logger.info(
        //         `Deleted item with tokenId ${request.object.get(
        //             "tokenId"
        //         )} at address ${request.object.get("address")}`
        //     )
        // }

        const activeItem = new ActiveItem()
        activeItem.set("marketplaceAddress", request.object.get("address"))
        activeItem.set("nftAddress", request.object.get("nftAddress"))
        activeItem.set("price", request.object.get("price"))
        activeItem.set("tokenId", request.object.get("tokenId"))
        activeItem.set("seller", request.object.get("seller"))

        logger.info(
            `Adding Address: ${request.object.get("address")}, TokenId: ${request.object.get(
                "tokenId"
            )}`
        )

        logger.info("Saving...")
        await activeItem.save()
        logger.info("Saved successfully")
    }
})

Moralis.Cloud.afterSave("ItemCancelled", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object: ${request.object}`)
    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${JSON.stringify(query)}`)

        const cancelledItem = await query.first()

        logger.info(`Marketplace | CancelledItem: ${JSON.stringify(cancelledItem)}`)
        // if (cancelledItem) {
        //     logger.info(
        //         `Deleting ${request.object.get("tokenId")} at address ${request.object.get(
        //             "address"
        //         )}`
        //     )
        // } else {
        //     logger.info(
        //         `No item found with address ${request.object.get(
        //             "address"
        //         )} and tokenId ${request.object.get("tokenId")} `
        //     )
        // }

        logger.info("Destroying...")
        await cancelledItem.destroy()
        logger.info("Destroyed successfully")
    }
})

Moralis.Cloud.afterSave("ItemBought", async (request) => {
    const confirmed = request.object.get("confirmed")
    const logger = Moralis.Cloud.getLogger()
    logger.info(`Marketplace | Object: ${request.object}`)
    if (confirmed) {
        const ActiveItem = Moralis.Object.extend("ActiveItem")
        const query = new Moralis.query(ActiveItem)
        query.equalTo("marketplaceAddress", request.object.get("address"))
        query.equalTo("nftAddress", request.object.get("nftAddress"))
        query.equalTo("tokenId", request.object.get("tokenId"))
        logger.info(`Marketplace | Query: ${query}`)
        const boughtItem = await query.first()
        // if (boughtItem) {
        logger.info(`Deleting ${request.object.get("objectId")}`)
        await boughtItem.destroy()
        logger.info(
            `Deleted item with Token ID ${request.object.get(
                "tokenId"
            )} at address ${request.object.get("address")}`
        )
        // }
    }
})
