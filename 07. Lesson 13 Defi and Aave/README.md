**Tasks** 
1. Deposit Collateral : ETH / WETH
    - Protocol Used: https://docs.aave.com/developers/v/2.0/deployed-contracts/deployed-contracts
2. Borrow another asset: DAI
3. Repay


**Check out the Uniswap Protocol**
**Check out the [Aave Protocol](https://docs.aave.com/hub/)**

Another interesting topic is liquidation: When you borrow more than you can repay, other users can take more loan from you than they normally should and this is called liquidation
- [Formatting with Ethers](https://github.com/ethers-io/ethers.js/issues/169)
- In reality borrowing and lending gives you or burns the LP Tokens, check them out as well
- Check out [Austin Griffith](https://austingriffith.com/)

**Errors**
- There were errors while forking mainnet as there were confusions between localhost and hardhat(*[Changing the providers solved the issue](https://ethereum.stackexchange.com/questions/110931/hardhat-mainnet-forking-and-impersonating-an-account-isnt-working-help#comment133879_110931)*)
- [ENS Name Error](https://github.com/ethers-io/ethers.js/issues/1051) : Simply change from term to term.address
