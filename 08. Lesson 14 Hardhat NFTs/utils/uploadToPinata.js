// // We're gonna pinFile to IPFS and pinJson to IPFS for the metadata
// const pinataSDK = require("@pinata/sdk")
// const path = require("path")
// const fs = require("fs")

// async function storeImages(ImagesFilePath) {
//     const fullImagesPath = path.resolve(ImagesFilePath)
//     const files = fs.readdirSync(fullImagesPath)
//     let responses = []
// console.log("Uploading to Pinata!")
//     for (fileIndex in files) {
//         const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
//         try {
//             // Create an api key and drop it in the dotenv
//             const response = await pinata.pinFileToIPFS(readableStreamForFile)
//             responses.push[response]
//         } catch (e) {
//             console.log(e)
//         }
//         return { responses, files }
//     }
// }

// module.exports = { storeImages }
