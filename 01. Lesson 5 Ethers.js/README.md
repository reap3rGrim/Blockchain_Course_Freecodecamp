# **Important notes and highlights**
## **Dependencies**
Ganache, ethers.js and solc-js are the modules we use for working with the contract here, check package.json for more information

<br />

**Compiling code with solc-js**

`yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol`

<br />

**Working with Ganache**

Add ganache as a dependency in yarn and use

<br />

> For working with testnets you can also run a local geth node and then work with the testnets accordingly

<br />

**Deployed Contract on Goerli**

> Deployed at address: 0x9C9Ca4C2accBe15cC8f691a1691000435fbBd94F