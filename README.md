# Band Protocol Overview

![](/assets/overview-usecase.png)

[Band Protocol](https://bandprotocol.com) is a protocol for decentralized data governance on the Ethereum blockchain. The protocol incentivizes multiple independent parties to work cooperatively to provide trusted data. Curated information is available on-chain, ready to be consumed by other blockchain protocols or decentralized applications. **Band Protocol serves as the data layer of the [Web3](https://github.com/w3f/Web3-wiki/wiki) ecosystem, bridging real world and/or subjective information to smart contracts.**

## Breaking Down Band Protocol

<!-- [TODO: NEED IMAGE FOR EACH OF THE BULLET POINTS] -->

- Band Protocol allows an independent group of people or entities that share interest in curating a specific set of information to form up as a [Community](/docs/community.md).

- Each community is built around its own cryptographic token, which represents ownership stake in the community and has its supply controlled by a [Continuous Bonding Curve](/docs/bonding-curve.md).

- The token is used as an incentive for community members to provide and verify data, using token mechanics like [Token Curated DataSource](/docs/tcd.md) or [Token Curated Registry](/tcr.md).

- All parameters in the community's smart contracts are controlled via [Governance Parameters](/docs/parameters.md). Token holders can propose and vote for changes to those parameters anytime.

- Curated data can be consumed by the general public via a generic [Query Interface](/docs/data-query.md). ÐApps that consume the data on-chain pay a small fee to the community.

- As more applications and end users consume data, the demand for the community token increases, providing incentive for existing data providers.

![](/assets/overview-band.png)

## Open Data Layer for ÐApps

Band Protocol is currently [live](https://data.bandprotocol.com) on Rinkeby testnet, so you can start experimenting with it. While the protocol itself is not limited to any specific data, Band Protocol develops three pilot public data endpoints that are ready for on-chain consumption today.

1. **Price Feed Endpoint** [0x8B3d...](https://rinkeby.etherscan.io/address/0x8B3dBb2Db70120Cf4D24c739E1c296DE98644238) for hourly exchange rates of BTC/USD, ETH/USD, and LTC/USD.
2. **Sports Result Endpoint** [0x7d19...](https://rinkeby.etherscan.io/address/0x7d19771a15c1314be9Bd436092A727A70Edc6482) for sport results of 4 major sport leagues: [NFL](https://www.nfl.com), [NBA](https://www.nba.com/), [MLB](https://www.mlb.com/), and [EPL](https://www.premierleague.com/).
3. **Lotteries Result Endpoint** [0x6863...](https://rinkeby.etherscan.io/address/0x6863019Ec1A5f675ce64699020A338Ee2256B981) for up-to-date US [Powerball](https://www.powerball.com) and [MegaMillions](https://www.megamillions.com/) winning numbers.

See [Data Query](/docs/data-query.html) section for technical explanation of how to utilize these data endpoints.

<!-- ## What's Next?

Learn more about Band Protocol's architecture by continuing on to [Architecture](/docs/architecture.html) section. You will learn how different parts of Band Protocol come to work together, and how to interact with the smart contracts using our developer tools. -->
