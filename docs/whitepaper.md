# Band Protocol Technical Whitepaper

<!-- Online data in digital community is often unreliable. Centrally curated data source is biased or provide no access for the general public. Paid reviews are engaged to provide biased reviews of products or places. On the other hand, public data in open community such as various social media platforms are unreliable because there is no incentive for people to moderate such content. One can observe many fake news in recent U.S. Presidential Election, phlishing bots on Twitter, or fake upvotes on Reddit to further one's own agenda. Data is becoming more and more essential in the new information age and undeniably there is a general need for reliable online data source.

Band Protocol is a decentralized data curation protocol. Our protocol incentivizes curators around the world to coordinate and ensure reliable data through token staking and bonding curve mechanism. We propose a solution where database or registries can be created around personalized tokens - which are used as an economic incentive for people to curate and moderate data while punish those that propose inaccurate information. These information can be organized as a token-curated registry or other forms of data, Band Protocol is a general blockchain protocol to create token-curated registries and communities, each with its own token and bonding curve.

Band Token is the native utility token on the delegated-proof-of-stake Band Chain, built on top of Tendermint with Plasma implementation. Band Token is used to secure the network, provide global liquidity to every Community Token, and act as a governance token for future protocol upgrade. -->

[[toc]]

## Introduction

<!-- talk about both sides of the problems: smart contracts can't easily data + data is not reliable -->

TODO

### Use Cases

## Band Protocol Overview

![](/assets/overview-usecase.png)

Band Protocol's main functionality is to bridge the gap between decentralized applications and real-world data while also ensure that data is accurate and trustworthy through economic incentives. Band Protocol will initially be built on the Ethereum network, but the protocol itself is not restricted to Ethereum infrastructure. As the protocol gets more widespread adoption, it will support all leading smart contract platforms and power the new generation of decentralized applications.

### Simple Data Layer for ÐApps

Existing data provider networks, such as [ChainLink](https://chain.link/) or [Oraclize](http://www.oraclize.it/), require [asynchronous](<https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)>) interactions between smart contracts and data layers. Not only does this method complicates smart contract implementations, it also introduce a significant delay as two blockchain transactions need to be executed and confirmed sequentially. To obtain data, a smart contract follows the following flow.

[INSERT IMAGE 1]

1. Contract saves the state of the current transaction to the contract's storage.
2. Contract emits an event to request for data query and stops the current transaction.
3. Off-chain network waits for sufficient transaction confirms and processes the request.
4. Off-chain network invokes a callback transaction with supplied query result.
5. Contract validates the transaction, recovers the state, and continues the execution flow.

<!-- A smart contract needs to emit a data request event and save the transaction's state. Offchain layers listens to the event and submit another transaction to resume the logic. While -->

**Band Protocol shifts the paradigm and instead provides an intuitive query interface for decentralized applications to receive real-world data as a simple function call to a static smart contract.** Data providers are responsible for in putting and curating data to the blockchain, making it ready to be consumed from Ðapps synchronously. As a result, querying data on Band Protocol is simple to implement and only incurs small gas cost overhead.

[INSERT IMAGE 2]

<!-- ```typescript
interface DataSource {
  // Check Query Price (in wei)
  function getQueryPrice() external view returns (uint256);
  // Data Query
  function getAsNumber(bytes32 key) external payable returns (uint256);
  function getAsBytes32(bytes32 key) external payable returns (bytes32);
  function getAsBool(bytes32 key) external payable returns (bool);
}
``` -->

<!-- Ethereum smart contracts can issue query for dataset built on Band Protocol through with a single function call. This sets Band Protocol apart from existing oracle networks such as [Chainink](https://chain.link/) or [Oraclize](http://www.oraclize.it/)

The primary u -->

### Consortium of Curation Groups

![](/assets/overview-band.png)

**Datasets inside Band Protocol are split into multiple [curation groups](#/dataset-curation-groups), each of which utilizes its own unique "dataset" token to stake and curate its dataset through mechanics like [TCR](##token-curated-registry) or [TCD](#delegated-dataset-curation).** While the curation groups are independent and do not share the same token, they are all secured by [Band token](#band-native-token) through the [bonding curve](#bonded-token-issuance) mechanic. This is fundamentally different from other curation protocols such as [DIRT Protocol](https://dirtprotocol.com), which exclusively uses one token for all types of curations. Having one token per group has two advantages.

- **Token holders have direct incentives to curate good data.** As the token's value is tied directly to the specific dataset curated within this group, curating good data gives benefits solely to the token holders. On the other hand, if there is only one token, it is not clear how contributing to any specific dataset will lead to a significant value increase. This can easily lead to [Tragedy of the Commons](https://en.wikipedia.org/wiki/Tragedy_of_the_commons) and low vote turnouts.

- **Bribing token holders be becomes more difficult.** Conversely, if there is one token, one bad dataset will likely not result in a significant drop in token value. Thus, bribing token holders to manipulate a dataset more probable than one-token-one-dataset situation, where token holders' loses are more significant should the dataset's quality drops.

For more information about curation groups, including its token issuance and goverance model, see [Curation Groups Section](#dataset-curation-groups) for more details.

### Band Native Token

Band Protocol is built around its own native token, Band token (BAND). BAND is initially released an [ERC-20](https://eips.ethereum.org/EIPS/eip-20) token on the Ethereum blockchain. As we roll out to more blockchains, BAND will be available there as well, with the ability to swap the token between supported blockchains. The token provides four main utilities to the protocol ecosystem.

- **Provide liquidity to the curation groups and guarantee token values.** Band token is used as collateral to issue dataset tokens. Anyone can buy dataset tokens by sending BAND to the curation group's [bonding curve](#bonded-token-issuance) smart contract. Conversely, dataset tokens can be sold to the bonding curve to receive back BAND. Similar to how there is a long tail of ERC-20 Token, there will be a long tail of less liquid dataset tokens. BAND acts as a network token to provide global liquidity between them and thus anyone can buy, sell or switch between any dataset token with instant liquidity.

- **Store the value of all datasets.** To mint any dataset token, Band token is required as collateral. Thus, as the demand of dataset tokens increase, BAND's demand will increase as well. This has a two-fold effect. Firstly, BAND's price and token value will increase, making it effectly reflect the value across all curation groups. Secondly, as dataset tokens are valued in terms of BAND, an increase in BAND's price results in more security for all curation groups.

- **Governance for future protocol upgrades.** Similar to projects like [0x](https://0x.org/)'s ZRX token, BAND can be used to propose and vote on future protocol improvements. Once BAND protocol is deployed, its internal logic cannot be changed easily, since upgrade can affect security and usability of the system. BAND Token will act as a governance token for stakeholders in every curation group to vote for future decentralized upgrade and governance issues, such as changing voting schemes or adding new curation methods.

- **Control dataset quality through curated dataset registry.** Initially the first set of datasets will be strictly handpicked. However, as Band Protocol moves toward decentralization, creating and curating a dataset will be permissionless. To control the quality of datasets inside the ecosystem, BAND token holders will together maintain a curated registry of ligitimate datasets based on a set criteria. Band token will be used as the voting power to protect the registry against bad actors.

### Protocol Economics

A protocol cannot survive without proper econimic incentives. Band Protocol relies on query fees to cover the cost of data providers and incentivize honest data curation. **Whenever a smart contract issues a data query function call, it must attach a fee in terms of the blockchain's native currency (ETH in the case of Ethereum) with the call.** Query fees get split among the dataset's token holders appropriately based on a fee schedule set by the curation group's [governance parameters](#governance-parameters).

[IMAGE 3]

The decision to accept the blockchain native currency is primarily to simplify onboarding and integration process, since it is unreasonable to assume that every Ðapp is willing to hold dataset tokens or Band token. Under the hood, Band Protocol uses [Uniswap Exchange Protocol](https://uniswap.io/) to instantly convert accepted currency to Band token, which then gets converted to dataset token through [bonding curve](#bonded-token-issuance) on the same transaction. Thus, although Ðapps pay in native currency, token holders still receive their revenue share in dataset token. Through the process, more BAND gets locked to bonding curve and the supply of dataset token increases, resulting in price increases for both tokens.

[IMAGE 4]

It is important to note that some curation methods, such as [token-curated registry](#token-curated-registry), do not necessarily need revenue to economically benefit the participants. In that case, the dataset community may collectively decide to set query fee to zero.

<!-- talk about-->

<!-- ## The BAND Tokens and -->

## Dataset Curation Groups

_Dataset Curation Group_ is the most fundamental unit of Band Protocol. Band Protocol consists of multiple groups, each of which utilizes its own unique token to stake and curate data. Dataset token holders participate in community governance and data curation. In return, they receive fee collected from public data consumption and gain token value appreciation.

### Dataset Token

TODO

### Bonded Token Issuance

Dataset token issuance is controlled by the curation group's bonding curve.

|           Parameter           |    Type    | Description |
| :---------------------------: | :--------: | :---------: |
|  `bonding:liquidity_spread`   | Percentage |
|   `bonding:inflation_rate`    | Percentage |
| `bonding:revenue_beneficiary` |  Address   |

### Governance Parameters

Governance parameters inside of a curation group dictate how other smart contracts in the group perform logic. For instance, parameter `bonding:liquidify_spread`

## Token-Incentivized Data Curation

During the fist mainnet launch, Band Protocol will provide two primary schemes for a curation group to collectively curate data. We are actively researching for more curation models, and will add them in the protocol in future protocol upgrades.

### Token-Curated Registry

One way that token holders can collectively build a public dataset is with [Token Curated Registry (TCR)](https://medium.com/@ilovebagels/token-curated-registries-1-0-61a232f8dac7). With TCR model, external applicants apply for an entry to get listed on the registry. Token holders validate the

#### Connect with Query Interface

Once up and running, curated registry

### Delegated Dataset Curation

TODO

## Concerns and Limitations

TODO

### Scalability and Gas Cost

TODO

### On-Chain Voting

TODO

## Furture Technical Goals

TODO

### Curating Huge Datasets

### Interchain Communication

TODO

### On-chain Data Privacy

TODO

<!-- talk about extend -->
