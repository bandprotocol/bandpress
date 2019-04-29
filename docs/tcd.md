# Token Curated DataSource

Token Curate DataSource (TCD) is a method for a community to collectively curate data. It is suitable for curating objective information that is easy to verify but has relatively large amount of data volume.

## Breaking Down TCD

TCD is in many ways similar to [Delegated Proof of Stake](https://en.bitcoinwiki.org/wiki/DPoS) consensus. Community members collective elect data providers by staking their token in the name of the candidates. Data providers have the authority to provide data to the public, and earn a portion of fees collected from data query.

- A community member who wishes to become a data provider deploys **Data Source Contract**. He or she then **registers** to become a provider candidate by staking `min_provider_stake` token.

- Other community members can **vote** for a provider candidate they trust. Top `max_provider_count` data provider candidates by the total number of voting stake become **active data providers**.

- Whenever there is a data query coming in, TCD contract issues a sub-query to every active provider's data source. Query Results get **aggregated** to become the final result of the data query.

- ÐApps pay `query_price` wei for each query, which gets converted to community token. `owner_revenue_pct` of the revenue goes to the owners of the active providers. The remaining goes to community members propotionally to their stake.

- Community members can **withdraw** their stake anytime, and get their stake returned back together with their portion of revenue. After a withdrawal, the active provider list gets recalculated.

- Data providers are responsible for maintaining their stake above `min_provider_stake` threshold. If a provider fails to do so, community members may **kick** the providers out of the active list.

<!-- In TCD curation, community members stake their token to select the data providers that are responsible for acting as the data source for the whole community. Each provider must stake at least `min_provider_stake` token to be considered as a candidate. Among the candidates, the top `max_provider_count` providers by total number of stake become active providers. Whenever there is a query request. TCD smart contract _aggregates_ the results from all of the active providers, and computes the final result. -->

### Query Result Aggregation

At version 1, Band Protocol provides two different methods for data aggregation. Concrete implementation details can be found in library [ArrayUtils.sol](https://github.com/bandprotocol/contracts/blob/master/contracts/utils/ArrayUtils.sol).

- **Number**: The final result is the [Median](https://en.wikipedia.org/wiki/Median) value among all the results.
- **Bytes32**: The final result is the [Majority](https://en.wikipedia.org/wiki/Majority) value among all the results, or failure if there's no majority.

## Creating New TCD

A TCD can be created by invoking `createTCD` transaction on the community's primary smart contract, with the initial configuration of TCD parameters. The process can be done either through band.js or by sending the transaction directly to the blockchain.

### TCD Parameters

All of the TCD parameters live under namespace `data:`. The paremeters can be changed through the community's governance smart contracts.

|         Parameter         |                        Description                        |
| :-----------------------: | :-------------------------------------------------------: |
| `data:min_provider_stake` |     Minimum amount of token a provider needs to stake     |
| `data:max_provider_count` |   Maximum number of active providers at any given time    |
| `data:owner_revenue_pct`  | Percentage of revenue going directly to providers' owners |
|    `data:query_price`     |       Cost of ÐApps to query one data point in Wei        |

```javascript
const tcdClient = await communityClient.createTCD({
  minProviderStake: "10000000000000000000000", // 1000 community token
  maxProviderCount: "5",
  ownerRevenuePct: "500000000000000000", // 50% of revenue
  queryPrice: "10000000000000000" // 0.01 ETH per query
});

// Get the address of the created TCD
console.log(tcdClient.getAddress());
```

Alternatively, if a TCD already exists, band.js can be used to directly create a `TCDClient` instance.

```javascript
import { TCDClient } from "band.js";

const tcdClient = await BandProtocolClient.make({
  provider: window.web3.currentProvider,
  network: "rinkeby",
  tcdAddress: "0x...."
});
```

## Becoming Data Provider

### Deploying Data Source Contract

Prior to becoming a data provider, the candidate must deploy data source smart contract. The contract allows TCD contract to query for data given a key, by implementing function `get(bytes32)`. Band Protocol does not restrict the concrete implementation of data source contract. However, a simple set-and-get data source contract is available [here](https://github.com/bandprotocol/contracts/blob/master/contracts/data/TrustedDataSource.sol).

### Registering as Data Provider Candidate

After deploying the data source contract, a potential provider can send `register` transaction to TCD contract to register as a potential candidate to provide data.

```javascript
await tcdClient
  .createRegisterDataSourceTransaction({
    dataSource: "0x....", // DataSource smart contract
    stake: "10000000000000000000000" // 1000 community token initial stake
  })
  .send();
```

### Kicking Data Provider with Low Stake

Data providers are responsible for maintaining their stake above `min_provider_stake` governance parameter threshold. If a provider fails to do so, a community member can send `kick` transaction to disqualify the data provider.

```javascript
await tcdClient.createKickDataSourceTransaction("0x...").send();
```

## Supporting Data Providers

### Voting for Data Provider

Community members can vote for a data provider by sending `vote` transaction to the TCD smart contract. The stake token gets added to the stake pool, and the voter receives **ownership share** propotionally.

```javascript
await tcdClient
  .createVoteDataSourceTransaction({
    dataSource: "0x...", // Address of data source contract to vote for
    stake: "1000000000000000000000" // 100 community token
  })
  .send();
```

### Withdrawing Stake and Get Revenue Share

Community members can withdraw their stake anytime by sending `withdraw` transaction to the TCD smart contract.

```javascript
await tcdClient.createWithdrawDataSourceTransaction({
  dataSource: "0x...", // Address of data source contract to withdraw vote
  withdrawOwnership: "100" // Withdraw 100 ownership share
});
```
