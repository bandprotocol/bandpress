# Architecture

Band Protocol contains a set of smart contracts and supporting tools that together creates an ecosystem for decentralized data curation. This section covers the on-chain smart contract architecture that powers Band Protocol.

## Instant Diagram

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

## Smart Contracts

All smart contracts that power Band Protocol is open-source and available on [Github](https://github.com/bandprotocol/contracts/) for public inspection. This section goes over each of

#### BandToken.sol

TODO

#### CommunityToken.sol

TODO

#### Parameters.sol

TODO

#### BondingCurve.sol

TODO

#### DelegatedDataSource.sol

TODO

#### TCR.sol

TODO

## Band.js Client-side Library

TODO

## GraphQL Query Layer

For off-chain query efficiency,
