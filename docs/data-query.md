# Query Interface

Band Protocol is designed with usage simplicity in mind. This section covers usage of the protocol from developer perspective, both for on-chain and off-chain data query.

## On-chain Query via Smart Contracts

Every community on Band Protocol provides its own unique `DataSource` smart contract address. The smart contract implements four public functions as shown below. `getQueryPrice` can be called for free to ask for the price (in [wei](http://ethdocs.org/en/latest/ether.html)) of calling other functions. The other three functions provide a systematic way to query data across different communities. Each community provides their own scheme of encoding data into 32-byte key and value.

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

### Price Feed Query

::: tip Rinkeby Address
[0x8B3dBb2Db70120Cf4D24c739E1c296DE98644238](https://rinkeby.etherscan.io/address/0x8B3dBb2Db70120Cf4D24c739E1c296DE98644238)
:::

The price feed endpoint allows smart contracts to query for recent cryptocurrency prices aggregated as the median value among multiple reputable data providers. The endpoint currently supports `BTC/USD`, `ETH/USD`, and `LTC/USD` pairs. ÐApps can query for price information using `getAsNumber` function. Note that the returned value is multiplied by `10^18` to preserve decimal precision.

```typescript
contract FooContract {
  DataSource public constant dataSource =
    DataSource(0x8B3dBb2Db70120Cf4D24c739E1c296DE98644238)

  function foo() {
    // SOME CODE
    uint256 bitcoinPrice =
      dataSource.getAsNumber.value(dataSource.getQueryPrice())("BTC/USD");
    assert (bitcoinPrice == 5579.13e18);  // Price is 5,579.13 USD per Bitcoin
    // SOME CODE
  }
}
```

### Sport Result Query

::: tip Rinkeby Address
[0x7d19771a15c1314be9Bd436092A727A70Edc6482](https://rinkeby.etherscan.io/address/0x7d19771a15c1314be9Bd436092A727A70Edc6482)
:::

The sport endpoint provides the results of four major sport leagues: [NFL](https://www.nfl.com), [NBA](https://www.nba.com/), [MLB](https://www.mlb.com/), and [EPL](https://www.premierleague.com/). ÐApps can query for sport results using `getAsBytes32` function with key format `AAABBBB/YYYYMMDD/CCC-DDD{/HHMM}`, where:

- `AAA` is the league unique identifier (`NFL`, `NBA`, `MLB`, or `EPL`)
- `BBBB` is the season year of the league
- `YYYYMMDDDD` is the year, month, and date when the match takes place (UTC)
- `CCC` is the home team 3 letter identifier
- `DDD` is the away team 3 letter identifier
- `HHMM` (optional) is the UTC time when the match takes place (only for MLB)

The result contains 2 bytes. The first byte is the home team's total score, and the second byte is the away team's total score.

```typescript
contract FooContract {
  DataSource public constant dataSource =
    DataSource(0x7d19771a15c1314be9Bd436092A727A70Edc6482)

  function foo() {
    // SOME CODE
    bytes32 sportResult = dataSource
      .getAsBytes32
      .value(dataSource.getQueryPrice())("NBA2019/20190427/LAC-GSW");
    assert (uint8(sportResult[0]) == 110); // The Clippers scored 110
    assert (uint8(sportResult[1]) == 129); // The Warriors scored 129
    // SOME CODE
  }
}
```

### Lottery Winning Number Query

::: tip Rinkeby Address
[0x6863019Ec1A5f675ce64699020A338Ee2256B981](https://rinkeby.etherscan.io/address/0x6863019Ec1A5f675ce64699020A338Ee2256B981)
:::

The lottery endpoint continuously feeds the results of the top two US lotteries: [Powerball (PWB)](https://www.powerball.com) and [MegaMillions (MMN)](https://www.megamillions.com/). ÐApps can query for winning numbers using `getAsBytes32` function with key format `XXX/YYYYMMDD`, where:

- `XXX` is the lottery unique identifier. `PWB` for Powerball and `MMN` for MegaMillions.
- `YYYYMMDD` is the year, month, and date of the lottery (local timezone).

The result contains 7 bytes. Each of the first 5 bytes represents each of the 5 white balls; the 6th byte represents the {Power|Gold} ball; and the 7th byte represents the winning multiplier.

```typescript
contract FooContract {
  DataSource public constant dataSource =
    DataSource(0x6863019Ec1A5f675ce64699020A338Ee2256B981)

  function foo() {
    // SOME CODE
    bytes32 powerballResult =
      dataSource.getAsBytes32.value(dataSource.getQueryPrice())("PWB/20190420");
    assert (uint8(powerballResult[0]) == 3);   // White Ball #1
    assert (uint8(powerballResult[1]) == 27);  // White Ball #2
    assert (uint8(powerballResult[2]) == 30);  // White Ball #3
    assert (uint8(powerballResult[3]) == 63);  // White Ball #4
    assert (uint8(powerballResult[4]) == 65);  // White Ball #5
    assert (uint8(powerballResult[5]) == 1);   // Power Ball #1
    assert (uint8(powerballResult[6]) == 3);   // Power Play Multiplier
    // SOME CODE
  }
}
```

## Off-chain GraphQL-based Query

In addition to on-chain query using Solidity, Band Protocol's public data can also be retrieved using Band-powered [GraphQL data endpoint](https://graphql.bandprotocol.com/graphiql).

### Price Feed Query

[TODO]

### Sport Result Query

[TODO]

### Lottery Winning Number Query

[TODO]
