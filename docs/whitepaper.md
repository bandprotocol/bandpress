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

![](/assets/two-tx-model.png)

1. Contract saves the state of the current transaction to the contract's storage.
2. Contract emits an event to request for data query and stops the current transaction.
3. Off-chain network waits for sufficient transaction confirms and processes the request.
4. Off-chain network invokes a callback transaction with supplied query result.
5. Contract validates the transaction, recovers the state, and continues the execution flow.

<!-- A smart contract needs to emit a data request event and save the transaction's state. Offchain layers listens to the event and submit another transaction to resume the logic. While -->

**Band Protocol shifts the paradigm and instead provides an intuitive query interface for decentralized applications to receive real-world data as a simple function call to a static smart contract.** Data providers are responsible for in putting and curating data to the blockchain, making it ready to be consumed from Ðapps synchronously.

![](/assets/one-tx-model.png)

As a result, querying data on Band Protocol is simple to implement and only incurs small gas cost overhead.

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

### Consortium of Data Governance Groups

![](/assets/overview-band.png)

**Datasets inside Band Protocol are split into multiple [data governance groups](#/dataset-governance-groups), each of which utilizes its own unique "dataset" token to stake and curate its dataset through mechanics like [Token-Curated Registry](##token-curated-registry) or [Token-Curated DataSources](#delegated-dataset-curation).** While the curation groups are independent and do not share the same token, they are all secured by [Band token](#band-native-token) through the [bonding curve](#bonded-token-issuance) mechanic. This is fundamentally different from other curation protocols such as [DIRT Protocol](https://dirtprotocol.com), which exclusively uses one token for all types of curations. Having one token per group has two advantages.

- **Token holders have direct incentives to curate good data.** As the token's value is tied directly to the specific dataset curated within this group, curating good data gives benefits solely to the token holders. Otherwise, if there is only one token, it is not clear how contributing to any specific dataset will lead to a significant value increase - and therefore the model for security and reliability of the data is weaker. This can easily lead to [Tragedy of the Commons](https://en.wikipedia.org/wiki/Tragedy_of_the_commons) and low vote turnouts.

- **Bribing token holders be becomes more difficult.** Conversely, if there is one token, one bad dataset will likely not result in a significant drop in token value. Thus, bribing token holders to manipulate a dataset more probable than one-token-one-dataset situation, where token holders' loses are more significant should the dataset's quality drops.

For more information about curation groups, including its token issuance and goverance model, see [Curation Groups Section](#dataset-governance-groups) for more details.

### Band Native Token

Band Protocol is built around its own native token, Band token (BAND). BAND is initially released an [ERC-20](https://eips.ethereum.org/EIPS/eip-20) token on the Ethereum blockchain. As we deploy to more blockchains, BAND will be available there as well, with the ability to swap the token between supported blockchains. The token provides four main utilities to the protocol ecosystem.

- **Provide liquidity to the curation groups and guarantee token values.** Band token is used as collateral to issue dataset tokens. Anyone can buy dataset tokens by sending BAND to the curation group's [bonding curve](#bonded-token-issuance) smart contract. Conversely, dataset tokens can be sold to the bonding curve to receive back BAND. Similar to how there is a long tail of ERC-20 Token, there will be a long tail of less liquid dataset tokens. BAND acts as a network token to provide global liquidity between them and thus anyone can buy, sell or switch between any dataset token with instant liquidity.

- **Store the value of all datasets.** To mint any dataset token, Band token is required as collateral. Thus, as the demand of dataset tokens increase, BAND's demand will increase as well. This has a two-fold effect. Firstly, BAND's price and token value will increase, making it effectly reflect the value across all curation groups. Secondly, as dataset tokens are valued in terms of BAND, an increase in BAND's price results in more security for all curation groups.

- **Governance for future protocol upgrades.** Similar to projects like [0x](https://0x.org/)'s ZRX token, BAND can be used for proposing and voting on future protocol improvements. Once BAND protocol is deployed, its internal logic cannot be changed easily, since upgrade can affect security and usability of the system. BAND Token will act as a governance token for stakeholders in every curation group to vote for future decentralized upgrade and governance issues, such as changing voting schemes or adding new curation methods.

- **Control dataset quality through curated dataset registry.** Initially the first set of datasets will be strictly handpicked. However, as Band Protocol moves toward decentralization, creating and curating a dataset will be permissionless. To control the quality of datasets inside the ecosystem, BAND token holders will together maintain a curated registry of ligitimate datasets based on a set criteria. Band token will be used as the voting power to protect the registry against bad actors.

### Protocol Economics

A protocol cannot survive without proper econimic incentives. Band Protocol relies on query fees to cover the cost of data providers and incentivize honest data curation. **Whenever a smart contract issues a data query function call, it must attach a fee in terms of the blockchain's native currency (ETH in the case of Ethereum) with the call.** Query fees get split among the dataset's token holders appropriately based on a fee schedule set by the curation group's [governance parameters](#governance-parameters).

![](/assets/ask-query-price.png)

The decision to accept the blockchain native currency is primarily to simplify onboarding and integration process, since it is unreasonable to assume that every Ðapp is willing to hold dataset tokens or Band token. In implementation, Band Protocol utilizes decentralized exchange protocols, such as [Uniswap](https://uniswap.io/) to instantly convert accepted currency to Band token, which then gets converted to dataset token through [bonding curve](#bonded-token-issuance) on the same transaction. Thus, although Ðapps pay in native currency, token holders still receive their revenue share in dataset token. Through the process, more BAND gets locked to bonding curve and the supply of dataset token increases, resulting in price increases for both tokens.

![](/assets/uniswap-conversion.png)

It is important to note that some curation methods, such as [token-curated registry](#token-curated-registry), do not necessarily need revenue to economically benefit the participants. In that case, the dataset community may collectively decide to set query fee to zero.

<!-- talk about-->

<!-- ## The BAND Tokens and -->

## Dataset Governance Groups

Dataset Curation Group is the most fundamental unit of Band Protocol. Band Protocol consists of multiple groups, each of which has its own unique token. Dataset token holders participate in community governance and data curation. In return, they receive fee collected from public data consumption and gain token value appreciation.

### Dataset Token

A Dataset Token is an [ERC-20](https://eips.ethereum.org/EIPS/eip-20) token that is deployed with a governance group when it is created. The token supply is controlled by [bonding curve contract](#bonded-token-issuance), which has the sole authority to mint and burn dataset tokens. Dataset tokens are used for curating data through [token-incentivized data curation methods](#token-incentivized-data-curation). Band Protocol adds three extra functionalities to the ERC-20 contract to improve user experience.

1. **[ERC-223](https://github.com/Dexaran/ERC223-token-standard)'s Transfer-and-Call** allows the token to be received and processed by a contract within a single transaction.

2. **[Minimi](https://github.com/Giveth/minime)'s Balance Snapshot** allows a contract to query for historical balance of any account. This is primarily useful for determining voting power and eliminate double voting.

3. **Transfer Freeze** allows authorized contracts to disable token transfer. This is primarily useful for implementing [Delegated Dataset Curation](#delegated-dataset-curation)'s stake mechanism while still allowing stakers to keep their token custody.

### Bonded Token Issuance

Dataset token issuance is controlled by the curation group's bonding curve bonded with Band token. Bonding curve concept is [originally proposed](https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5) by [Simon de la Rouviere](https://twitter.com/simondlr). Bonding curve ensures that (1) dataset token's price always goes up as the supply increases, and (2) token holders always have an option to "exit" by selling their dataset tokens to receive back proportional BAND back. This ensures that the dataset tokens always remain liquid and useful in any situation, protecting the incentive mechanisms crucial for successful operation.

#### Value-Supply Function

This [convex function](https://en.wikipedia.org/wiki/Convex_function) describes the relationship between the dataset token's total supply and its total value in terms of collateralized Band tokens. In other words, given the current supply `s`, `V(s)` produces the total number of BAND collateralized in the bonding curve contract. Notice that by defining this value-supply function, one can easily derive the spot price of dataset token at a given total supply `P(s)` as the derivative of the value-supply equation at that specific supply value.

[IMAGE 5]

Whenever a person buys dataset tokens, she sends BAND tokens to the bonding curve contract. The contract calculatest the adjusted dataset token's supply and mints the added supply to the buyer. Opposite conversion happens when a person decides to sell dataset tokens.

[IMAGE 6]

To combat against front-running, the bonding curve contract allows users to specify **price limit**, simulating traditional [limit orders](https://www.sec.gov/fast-answers/answerslimithtm.html). A transaction will get reverted should it violates the limit condition, saving the user from executing a bad order.

#### Equation Library

Band Protocol provides [a generic smart contract](https://medium.com/bandprotocol/encoding-and-evaluating-mathematical-expression-in-solidity-f1bb062fa86e) library to construct arbitrary mathematical expressions in Solidity (also see [video explanation](https://www.youtube.com/watch?v=1rBSn6aC2mQ) for more details). Any expression
that can be described in terms of recursive applications of common unary, binary, and ternary operations on the current supply and numeric constants can be encoded.

#### Liquidity Spread

Liquidity spread controls the difference between buying and selling prices of dataset token. The parameter can be set via [governance parameters](#governance-parameters) under name `bonding:liquidity_spread`. High liquidity spread makes it more difficult for malicious actors to perform [front-running attacks](https://en.wikipedia.org/wiki/Front_running). However, high spread also leads to community members receive less BAND when they cash out their community token. Revenue from liquidity spread is sent to address specified by `bonding:revenue_beneficiary` parameter. The default value is the curation group's creator address.

### Governance Parameters

Governance parameters inside of a curation group dictate how other smart contracts of the group perform their logics. Formally, gonvernance parameters contain of a set of 32-byte key and 32-byte value pair. A 32-byte value can be interpreted as an interger, a percentage value, an blockchain address, or an IPFS hash dependeing on its key. For instance, parameter `bonding:liquidity_spread` maps to an integer that controls the spread percentage between the bonding curve buy and sell spot prices. Dataset token holders can conduct changes in parameters through the following process.

[IMAGE 8]

1. A dataset token holders **proposes** a change to one or more parameters by sending a "propose" transasction to the governance contract, thereby creating a **proposal**. Once created, a proposal stays open for `params:expiration_time` seconds.

2. While the proposal is open, token holders can **vote** for approval or rejection to the proposal.

3. After the voting period ends, if (1) more than `params:min_particiation_pct` percentage of ALL tokens participated in the vote AND (2) more than `params:support_required_pct` percentage of participating tokens voted for approval, the proposal is approved and the change is applied.

4. Additionally, to facilitate unanimous parameter changes, a proposal can be resolved prior to its expiration if more than `params:support_required_pct` of ALL tokens approve the proposal.

Initial parameters of the bonding curve and governance contracts will be set during the data governance group's creation. It is important to note that the three parameters of the governance contract itself can also be changed with via same proposing-voting process.

## Token-Incentivized Data Curation

During the first mainnet launch, Band Protocol will provide two primary models for a curation group to utilize its dataset token to collectively curate data. We are actively researching for more curation models, and will add them to the protocol in future protocol upgrades. A curation group is not necessarily restricted to use only use exactly one curation method; the same dataset token can be used across multiple datasets within the same curation group.

This section primarily discusses the technical token mechanics. More concrete examples will be explained in [potential use cases](#potential-use-cases) section.

### Token-Curated Registry

Token holders can collectively build a public dataset with [Token-Curated Registry (TCR)](https://medium.com/@ilovebagels/token-curated-registries-1-0-61a232f8dac7). A TCR is an on-chain list data structure of 32-byte entries, including strings, addresses, numbers, or hashes. Three parties are involved in building a TCR, **application candidates, token holders, and data consumers**.

- **Application candidates** stake their dataset tokens to get their entries included in the system. The risk losing tokens if their entries are not aligned with the TCR's guideline.

- **Token holders** monitor the quality of entries on the TCR. They challenge low quality entries, and vote for ongoing challenges. They receive token rewards for performing the curation tasks.

- **Data consumers** read and utilize information about the entries on the TCR. While the consumers do not pay, they provide intrinsic value to the owners of the TCR's entries.

#### How does TCR Curation Work?

[IMAGE]

1. A candidate **applies** for an entry to be listed on the TCR by staking `min_deposit` dataset token. The entry gets automatically listed if it is not challenged for `apply_stage_length` duration.

2. A token holder can **challenge** an entry by staking a matching deposit. The entry goes to a voting period. Using [commit-reveal voting](https://en.wikipedia.org/wiki/Commitment_scheme), token holders **vote** to keep or remove the entry.

3. If less than `min_participation_pct` of tokens participated, the challenge is considered inconclusive. The matching deposit is returned to the challenger, and the entry stays on the TCR.

4. If enough tokens participated and more than `support_required_pct` vote for entry removal, the entry is removed and the entry's deposit becomes challenger's reward. The challenger receives `dispensation_percentage` percent, while the winning voters get the remaining.

5. On the other hand, if the challenge fails, the challenger's stake is confiscated and split among the entry owner and voters that vote to keep the entry. The entry owner receives `dispensation_percentage` percent, while the winning voters get the remaining.

::: tip Depreciative Stake Model
Band Protocol is actively experimenting with [Depreciative Stake Model](https://medium.com/bandprotocol/token-curated-registry-with-depreciative-stake-model-fc8fe67c8fd7) in entry deposit.
:::

TCR parameters are configurable via the curation group's [governance parameters](#governance-parameters).

#### Connect with Query Interface

A TCR can power the curation group's query interface with two possible interfaces.

- `bool getData(bytes32)` checks for an entry's existence in the TCR.
- `bytes32 getData(uint256)` gets the `n`^th entry currently residing in the TCR.

[IMAGE]

### Delegated Dataset Curation

While TCR is suitable for low volume data that requires attention from the whole community, Token-Curated DataSouce (TCD) is a method to objective data with higher volume. TCD is in many ways similar to [Delegated Proof of Stake](https://en.bitcoinwiki.org/wiki/DPoS) consensus. **Token holders** collectively elect data providers by staking their token in the name of the candidates. **Data providers** have the authority to provide data to the public, and earn a portion of the fees collected from data queries.

- **Data providers** apply for the authority to provide data to the dataset. Top providers by total stake get to provide data. They receive the majority of query fees in exchange for their services.

- **Token holders** stake their tokens for data providers that they trust. They earn a smaller portion of query fees every in exchange for help securing the list of top trusted data providers.

#### How does TCD Curation Work?

[IMAGE]

- A token holder who wishes to become a data provider deploys **Data Source Contract**. She then **registers** to become a provider candidate by staking `min_provider_stake` token.

- Other token holders can **stake** for a provider candidate they trust. Top `max_provider_count` data provider candidates by the total number of token staked become **active data providers**.

- Whenever there is a data query coming in, TCD contract issues a sub-query to every active provider's data source. Query results are **aggregated** to become the final result of the data query.

- Ðapps pay `query_price` ETH for each query, which gets converted to community token. `owner_revenue_pct` of the revenue goes to the active providers. The remaining goes to community members propotional to their stake.

- Token holders can **withdraw** their stake anytime, and get their stake back together with their portion of revenue. After a withdrawal, the active provider list gets recalculated.

- Data providers can also **withdraw** their stake. However, they must notify TCD smart contract about their intention to withdraw for `withdraw_delay` duration. This allows ordinary token holders their stakes prior to data providers.

#### Connect with Query Interface

External data consumers query for data using the query interface, which aggregates data points among currently active data providers. Band Protocol will initially provide two aggregation methods.

- **Number**: The final result is the [Median](https://en.wikipedia.org/wiki/Median) value among all the results.
- **Bytes32**: The final result is the [Majority](https://en.wikipedia.org/wiki/Majority) value among all the results, or failure if there is no majority.

[IMAGE]

## Potential Issues and Limitations

### Parasitic Data Sources

A parasitic smart contract consumes data from a dataset and redistributes it to other Ðapps at a lower cost. In essense, it acts as a [caching layer](<https://en.wikipedia.org/wiki/Cache_(computing)>) to the original truth, resulting in a loss of revenue to the original curated dataset. While traditional companies can prevent data reselling businesses using law enforcement, an autonomous curation group's smart contracts do not have such privilege.

<!-- [IMAGE 11] -->

Unfortunately, Band Protocol as an open protocol cannot prevent this party's existence. However, Ðapps that choose to rely on parasitic smart contracts risk receiving out-to-date or malicious data. As the Ðapps get bigger, since their trust and reputation are put at stake, they should converge to consume data from official data sources.

<!-- ### Scalability and Gas Cost

The current protocol design requires data providers to constantly feed data to the blockchain. . See [curating huge datasets](#curating-huge-datasets) section below for more details. -->

<!-- Long-term wise, Band Protocol has scalability mitigation plans  in case the scalability issue arises. Note that we choose not to include them in the first iteration to not overcomplicate the protocol. -->

### On-Chain Voting

The viability of token-based on-chain voting is not yet completely proven, particularly with respect to potential bribery. This topic has been in active research by several teams. However, as of current, token-based voting is the mechanic that is most widely adopted and is the best way to combat against [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack). Band Protocol implements the following extra layers to disincentivize attacks.

- While dataset token is free to be bought or sold va continuous bonding curve, the contract imposes small liquidity spread between buy and sell prices. This makes buying tokens solely to influence a specific voting costly.

- Every voting-based decision inside of Band Protocol can be re-considered. A TCR challenge can be initiated again should the former challenge ends with an unfavorable result. Governance proposals, similarly, can be re-proposed.

Band Protocol will continue to actively research on-chain voting, with the voting mechanics likely to be upgraded should better techniques and implementations develop.

## Potential Use Cases

### Decentralized Finance

The majority of existing decentralized finance (DeFi) applications share one critical source of risk: _Price Feed Oracle_. Reputable projects such as [MakerDAO](https://makerdao.com), [Compound](http://compound.finance), [Dharma](https://dharma.io), [dYdX](https://dydx.exchange), or [SET](https://setprotocol.com), rely on only a relatively small number of trusted developers to provide off-chain price information to the protocol. Band Protocol can fill the gap and provide such crucial information, allowing those projects to focus on the aspects that they do best, while also enjoying the security of Band's data providers.

### Identity Layer

Many decentralized applications struggle to deal with fake accounts and Sybil attacks. As [Vitalik suggests](https://vitalik.ca/general/2019/04/03/collusion.html), identity layer is one of the most crucial parts for building collusion-resistant tokenomic system. Band Protocol can serve as a platform for different identity services to together curate identity information, ready to be consumed by applications via a simple query interface.

### Gaming, Gambling, and Prediction Markets

Gaming and Gambling have been big in the blockchain ecosystem since the start. By utilizing Band Protocol, dApps can access trusted real-world information and is not controlled by a single source of truth. Similar to DeFi, this allows developers to focus on their core product while also leverage Band Protocol's security.

### Supply Chain Tracking

Buying and selling real-world products in a fully trustless way using cryptocurrency is near impossible with current technology. Band Protocol allows supply-chain related data such as item shipments or non-blockchain payments. Smart contracts can verify such information on-chain and perform financial logic accordingly.

## Future Technical Goals

### Curating Massive Datasets

For Band Protocol to become the go-to place for data query, similar to traditional web's [Wikipedia](https://wikipedia.org) or [Wikidata](https://www.wikidata.org/), it must be able to support large datasets. With the current TCD design, data providers must submit every single piece of data in a dataset to the blockchain, which is not feasible due to prohibitive costs. The next iteration of Band Protocol will allow data providers to submit only the [Merkle root](https://en.wikipedia.org/wiki/Merkle_tree) of the complete dataset. Raw data will be distributed through an off-chain network, where token holders will collectively verify data. On-chain smart contracts can check for data validity through the same query interface.

<!-- [IMAGE 12] -->

### Interchain Communication

A dataset curation group that aims to curate the hash-chains of other blockchains will be available. Combining with Merkle-hash compression mentioned above, Ethereum smart contracts will be able to inspect what happens on other blockchains, such as Bitcoin or EOS.

<!-- [IMAGE 13] -->

We envision Band Protocol as a blockchain-agnostic protocol, with Band token available on every supported blockchains. To enable that, Band token will support cross-chain [atomic swaps](https://en.bitcoin.it/wiki/Atomic_swap) between blockchains, similar to [BancorX](https://blog.bancor.network/announcing-bancorx-the-first-cross-blockchain-decentralized-liquidity-network-aebb6a0dad8d), albeit with decentralized data oracle powered by Band Protocol itself. With this enabled, we can effectively interconnect different blockchains an empower a wider range of decentralized applications.

### On-chain Data Privacy

Some data is not feasible to be stored and published as a plain text. Personal information such as name, age, or credit scores are private. However, such information is crucial to unlock the potential of decentralized applications. For instance, non-collateral loan applications require personal information to make a sound lending decision. In future iterations of Band Protocol, we plan to incorporate cutting edge cryptographic techniques, including but not limited to [trusted execution environment (TEE)](https://en.wikipedia.org/wiki/Trusted_execution_environment) and [zero-knowledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof) to allow trustless information assertion without compromising user privacy.

## Conclusion

TODO
