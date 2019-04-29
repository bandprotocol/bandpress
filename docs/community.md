# Band Community

Community is the most fundamental unit of Band Protocol. Band Protocol consists of multiple communities, each of which utilizes its own unique token to for dataset curation. Community token holders participate in community governance and data curation. In return, they receive fee collected from public data consumption and gain token value appreciation.

## Band Native Token

::: tip BAND ERC-20 Rinkeby Address
[0xD6aE8250b8348C94847280928c79fb3b63cA453e](https://rinkeby.etherscan.io/token/0xD6aE8250b8348C94847280928c79fb3b63cA453e)
:::

The Band Protocol token ([BAND](https://rinkeby.etherscan.io/token/0xD6aE8250b8348C94847280928c79fb3b63cA453e)) is the native token of Band Protocol. It represents the collective ownership across all curation communities inside of the protocol. BAND token is implemented as an [ERC-20](https://eips.ethereum.org/EIPS/eip-20) compatible smart contract, and is used as collateral to mint any community token, using [dynamic bonding curve](/docs/bonding-curve.md) model. During testnet, BAND token is available for free from [BAND faucet](https://faucet.bandprotocol.com).

```javascript
// Transfer 1 BAND to an address owned by VB
await bandClient
  .createTransferTransaction({
    to: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    value: "1000000000000000000"
  })
  .send();
```

## Creating Community

::: tip BAND Community Factory Address
[0xD6aE8250b8348C94847280928c79fb3b63cA453e](https://rinkeby.etherscan.io/address/0xD6aE8250b8348C94847280928c79fb3b63cA453e)
:::

Creating Band Protocol community can be done with a single JavaScript command, which will broadcast a `createCommunity` transaction to [BandRegistry smart contract](https://rinkeby.etherscan.io/address/0xb7F652Ffbd4Cb1eb8EC9E10E05B01204084ef903#writeContract). After the transaction is completed, an instance of community client will be returned. See sections [Bonding Curve](/docs/bonding-curve.md) and [Governance Parameters](/docs/parameters.md) for details regarding the respective parameters.

```javascript
const communityClient = await bandClient.createCommunity({
  name: "Example Community", // ERC-20 community token name
  symbol: "XEC", // ERC-20 community token symbol
  bonding: {
    collateralEquation: ["8", "1", "0", "2"], // x^2
    liquiditySpread: "30000000000000000" // 3%
  },
  params: {
    expirationTime: "300", // 5 minutes
    minParticipationPct: "10000000000000000", // 1%
    supportRequiredPct: "800000000000000000" // 80%
  }
});

// Get the primary address of the created community
console.log(communityClient.getAddress());
```

## Community Token

Each community has its own ERC-20 token to use an incentive inside the community. The token's address can be found at the community contract's `token` member, or by using band.js.

```javascript
// Get the community's token address
console.log(await communityClient.getTokenAddress());

// Transfer 1 XEC to an address owned by VB
await communityClient
  .createTransferTransaction({
    to: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    value: "1000000000000000000"
  })
  .send();
```

<!--
## Bonding Curve

Band Protocol integrates the concept of [dynamic bonding curve](https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5) into every community. During community creation, the creator specifies two parameters related to bonding curve.

### Collateral Equation

Collateral equation defines the relationship between the current community token supply and the total BAND token collateralized in the system.

### Liquidity Spread

TODO

## Governance Parameters

Governance Parameters are

```javascript
// Propose a transaction to adjust bonding curve liquidity spread
await communityClient.createProposeTransaction({
  reason: "The current 3% spread is too high; let's adjust to 1%",
  keys: ["bonding:liquidity_spread"],
  values: ["10000000000000000"] // 1%
});

// Vote for an existing proposal
await communityClient.createVoteTransaction({
  proposalId: 1, // The unique ID of the proposal, found from transacion log
  yesVote: 100, // Amount of token allocated to vote for YES
  noVote: 0 // Amount of token allocated to vote for NO
});
```

## Dele

## Next Steps -->
