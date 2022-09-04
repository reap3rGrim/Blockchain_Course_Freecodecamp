   # **Hardhat Simple Storage**
   <br/>

**Simple Project**
   <br/>

   Setting up the project

   `yarn init`

   `yarn add --dev hardhat`
   
   `yarn hardhat`
   
   `yarn add --dev prettier prettier-plugin-solidity`
   

   - Putting **it.only** runs only one test or using 
   `yarn hardhat run test --grep something`

   
   - For verification you can simply run 
   `yarn hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS "Constructor arguments"`

   - Try the console 
   `yarn hardat console --network NETWORK`

- **[Chainlist](https://chainlist.org/)** has all the chain IDs that you may need

- Use hardhat verify for verification of programs

**Errors** : Try adding `require("@nomicfoundation/hardhat-toolbox")` to your hardhat.config

- You can write tasks by writing in hardhat config or by creating a folder called tasks

- Run `yarn hardhat node` for a local ganache like demo network

- Testing works with Mocha framework

- Use hardhat-gas-reporter for gas testing 

- hardhat waffle is for working with waffle framework
### > **Contract Deployed at 0x0E7a163b19f37BA2C7D933162371961104A3c3C7 & 0x2c88998711a03236FB188b7DCD606dF4822aD3DB**