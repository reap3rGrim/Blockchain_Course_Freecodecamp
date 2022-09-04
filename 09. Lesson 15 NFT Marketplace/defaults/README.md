 Create a decentralized **NFT Marketplace**
    1. `List Item` : *This will be in a way that the marketplace will get approval for listing the NFT while the contract owner owns the NFT himself rather than transferring the NFT to a contract and then waiting for it to be sold*
    2. `Buy Item`
    3. `Cancel Item`
    4. `Update Listing` 
    5. `Withdraw Proceeds`

*Links*
https://fravoll.github.io/solidity-patterns/pull_over_push.html
https://www.google.com/search?q=pull+over+push+solidity&oq=pull+over+push+solidity&aqs=chrome..69i57.6609j0j1&sourceid=chrome&ie=UTF-8


**Moralis**

- You can watch the events from Moralis Sync
- You have already connected moralis with react-moralis, but for running appEvents you'll have to add it to your node
- Connect the local devchain using moralis frpc or moralis-admin-cli and then add the events programatically or directly and then work accordingly

Steps: 
- Connecting moralis to the hardhat node 
- Add events programmatically or directly
- Adding moralis cloud functions which are scripts that run on changes in the database

Errors
- After closing the node and restarting the node, the moralis database gets confused. To resolve it reset local chain from the moralis server settings