- **Tasks**

    - Basic NFT
    - Random IPFS NFT
    - Dynamic SVG NFT 

- Not uploaded to Pinata and IPFS 

- [Testnet Video Section](https://youtu.be/gyMwXuJrbJQ?t=84587)

- Encoding a function directly
    - Call changes the state of the blockchain at low level
    - Staticcall is like call at a low level
    - The blank calldata below deploy on remix populates the call field:
        `(bool success, ) = contract.call{value:address(this).balance}("CALLDATA POPULATED FIELD")`
    - Check out the [call of a function without a contract directly](https://github.com/PatrickAlphaC/hardhat-nft-fcc/blob/main/contracts/sublesson/CallAnything.sol)