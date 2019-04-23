# Data Query

Band Protocol is designed to be simple to use\. This section covers usage of the protocol from developer perspective, both for on-chain and off-chain data query.

## On-chain Query via Smart Contracts

Every community living inside Band Protocol provides its own unique `DataSource` smart contract address. The smart contract implements four public functions as shown below. `getQueryPrice` can be called for free to ask for the price (in [wei](http://ethdocs.org/en/latest/ether.html)) of calling other functions. The other three functions provide a systematic way to query data across different communities. Each community provides their own scheme of encoding data into 32-byte key and value.

```typescript
interface DataSource {
  // Check Query Price (in wei)
  function getQueryPrice() public view returns (uint256);
  // Data Query
  function getAsNumber(bytes32 key) public payable returns (uint256);
  function getAsBytes32(bytes32 key) public payable returns (bytes32);
  function getAsBool(bytes32 key) public payable returns (bool);
}
```

### Price Feed Endpoint

::: tip Rinkeby Address 
[0x02557a5E05DeFeFFD4cAe6D83eA3d173B272c904](https://rinkeby.etherscan.io/address/0x02557a5e05defeffd4cae6d83ea3d173b272c904)
:::

The price feed endpoint allows smart contracts to query for recent cryptocurrency prices aggregated as the median value among multiple reputable exchanges. The endpoint currently supports `BTC/USD`, `ETH/USD`, and `LTC/USD` pairs. ÐApps can query for price information using `getAsNumber` function. Note that the returned value is multiplied by `10^18` to preserve decimal precisions.

```typescript
#pragma solidity 0.5.0;
import "@band/contract/DataSource.sol";

contract FooBarContract {
  DataSource public constant dataSource = 
    DataSource(0x02557a5E05DeFeFFD4cAe6D83eA3d173B272c904)
  
  function func() {
    // SOME CODE
    uint256 bitcoinPrice = 
      dataSource.getAsNumber.value(dataSource.getQueryPrice())("BTC/USD");
    assert (bitcoinPrice == 5500.88e18);  // Price is 5500.88 USD per Bitcoin
    // SOME CODE
  }
}
```

### Sport Result Endpoint

::: tip Rinkeby Address
[0x02557a5E05DeFeFFD4cAe6D83eA3d173B272c904](https://rinkeby.etherscan.io/address/0x02557a5e05defeffd4cae6d83ea3d173b272c904)
:::

### Lottery Winning Number Query

::: tip Rinkeby Address
[0x02557a5E05DeFeFFD4cAe6D83eA3d173B272c904](https://rinkeby.etherscan.io/address/0x02557a5e05defeffd4cae6d83ea3d173b272c904)
:::

```typescript
#pragma solidity 0.5.0;
import "@band/contract/DataSource.sol";

contract FooBarContract {
  DataSource public constant dataSource = 
    DataSource(0x02557a5E05DeFeFFD4cAe6D83eA3d173B272c904)
  
  function func() {
    // SOME CODE
    bytes32 powerballResult = 
      dataSource.getAsBytes32.value(dataSource.getQueryPrice())("PWB/2019-04-20");
    assert (uint8(powerballResult[0]) == 3);   // White Ball #1
    assert (uint8(powerballResult[1]) == 27);  // White Ball #2
    assert (uint8(powerballResult[2]) == 30);  // White Ball #3
    assert (uint8(powerballResult[3]) == 63);  // White Ball #4
    assert (uint8(powerballResult[4]) == 65);  // White Ball #5
    assert (uint8(powerballResult[5]) == 1);   // Power Ball #1
    assert (uint8(powerballResult[0]) == 3);   // Power Play Multiplier
    // SOME CODE
  }    
}


## Off-chain GraphQL-based Query

In addition to on-chain query using Solidity, Band Protocol's public data can also be retrived using Band-powered [GraphQL data endpoint](https://graphql.bandprotocol.com/graphiql).

### Price Feed Query

### Sport Result Query

### Lottery Winning Number Query

For other endpoints, 

## Data Privacy

It is important to note that since Band Protocol's data lives on the Ethereum blockchain, 