Workflow for the frontend

1. Header 
2. We're gonna use react-moralis for now 
3. Dev dependencies are only used in parts that do not affect the final build
 Like prettier is for efficiency not mandate

 4. initializeOnMount={false} is used when you do not want to connect to a Moralis server

5. Moralis 
6. Web3uikit 
https://stackoverflow.com/questions/73352374/web3uikit-module-not-found-error-even-when-module-is-installed

was encountering the same error, turns out i have to install this very specific version "^0.1.159" use : npm i web3uikit@^0.1.159

https://github.com/PatrickAlphaC/nextjs-smartcontract-lottery-fcc/issues/9

You have to install web3 tools :

yarn add @web3uikit/web3
and import from that, instead of web3uikit

7. yarn errors are common
https://hidayatabisena.medium.com/how-to-solve-npm-err-code-elifcycle-when-running-npm-run-dev-on-your-next-js-project-4794226d040f

8. We're gonna useWeb3Contract from react-moralis for interacting with the smart contract

9. Create a deploy upgrade front-end script
    Create a constants file where you can put the abi and addresses 
    Then simply run yarn hardhat node 
    After the frontend is built for mocking the chainlink Keepers and getting a random number use the MockoffChain.js script

10. You can deploy on netlify, vercel, google cloud or any other providers
    It's important to keep backend decentralized however you can keep many of the front end in a centralized manner or a decentralized manner

    We'll need to build our website before uploading 

11. fleek.co is an automatic way for upload
    NFT.storage
    web3.storage
    textile powergate
    estuary tech
    orbit db
    fvm.filecoin.io
    Lighthouse
    you can also manually upload

12. https://protocol-labs.gitbook.io/launchpad-curriculum/launchpad-learning-resources/protocol-labs-network/os-contributing

13. Resources for learning 
- proto.school
- NFTschool.devv
- hackathons.filecoin.io

