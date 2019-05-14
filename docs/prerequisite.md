# Prerequisite

## Smart Contracts

Band Protocol is a set of [smart contracts](https://github.com/bandprotocol/contracts) on the Ethereum blockchain that together provides an open standard for handling and management of data for any decentralized program or application that requires trusted and reliable data.

Below is the address of BAND native token contract and the Band registry contract on Rinkeby testnet.

|     Contract     |  Type   |                                                            Address                                                            |
| :--------------: | :-----: | :---------------------------------------------------------------------------------------------------------------------------: |
| BandRegistry.sol | Factory | [0x798686B18fb1E29b073401e62a5aFB8b145bD5C8](https://rinkeby.etherscan.io/address/0x798686B18fb1E29b073401e62a5aFB8b145bD5C8) |
|  BandToken.sol   | ERC-20  | [0x7d534Fe41A7443dCd1b62B6D843A07487f4cc4a4](https://rinkeby.etherscan.io/address/0x7d534Fe41A7443dCd1b62B6D843A07487f4cc4a4) |

In addition, Band Protocol has deployed **four** curated datasets on Rinkeby testnet, including three contracts that use [token-curated data source](/docs/tcd.md), and one ([CoinHatcher.com](https://coinhatcher.com)) that uses [token-curated registry](/docs/tcr.md). The addresses of smart contracts associated with them are available [here](/docs/data-query.html#on-chain-query-via-smart-contracts).

## Band.js JavaScript Library

[Band.js](https://github.com/bandprotocol/band.js) is a utility library for sending transaction related to Band Protocol to the Ethereum blockchain. You can install band.js into you existing JavaScript project with [npm](https://npmjs.com) or [yarn](https://yarnpkg.com).

```bash
# NPM
$ npm install --save band.js
# Yarn
$ yarn install band.js
```

The library requires [Web3](https://web3js.readthedocs.io/en/1.0/web3.html) provider during its instantiation in order to send transactions to the Ethereum network. On client side wallets, such as [Metamask](https://metamask.io), provider be found at `window.web3.currentProvider`. If you are running on a server side, web3 provider can be constructed with connection to an Ethereum node that controls the private key.

```typescript
import { BandProtocolClient } from "band.js";
import { Web3 } from "web3";

// Client
const bandClient = await BandProtocolClient.make({
  provider: window.web3.currentProvider,
  network: "rinkeby"
});

// Server
const bandClient = await BandProtocolClient.make({
  provider: new Web3.providers.HttpProvider("http://localhost:8545"),
  network: "rinkeby"
});
```

### Representing On-Chain Decimal Number

The Ethereum Virtual Machine does not directly support non-integer decimal numbers. To work around that, Band Protocol uses 18 digit offset on every decimal number. For example, a number `3.1415` is represented as `3141500000000000000`.

### Representing On-Chain Percentage

Similarly to decimal number, Band Protocol represents percentage using `1000000000000000000` as 100%. For example, 25% is encoded and sent to the blockchain as `250000000000000000`.

## Band GraphQL Public Endpoint

::: tip GraphQL Query Endpoint
[https://graphql.bandprotocol.com/graphql](https://graphql.bandprotocol.com/graphql)
:::

Band Protocol provides a standard [GraphQL](https://graphql.org/) query interface for data related to the protocol. Developers can fire HTTP requests directly to the endpoint to obtain data, or use familiar GraphQL client library such as [Apollo](https://apollographql.com/). See [Query Interface](/docs/data-query.md) for example usage.

<!-- ```bash
# Get name and address of all communities
$ curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ allCommunities { nodes { name address } } }" }' \
  https://graphql.rinkeby.bandprotocol.com/graphql
```

Alternatively, GraphQL queries can be issued directly from band.js.

```typescript
import { Utils } from "band.js";

const data = await Utils.graphqlRequest(`{
  allCommunities {
    nodes {
      name
      address
    }
  }
}`);
``` -->

<!-- Note that service like

Graphical query interface (powered by [GraphiQL](https://github.com/graphql/graphiql)) is also available at [https://graphql.bandprotocol.com/graphiql](https://graphql.bandprotocol.com/graphiql) -->
