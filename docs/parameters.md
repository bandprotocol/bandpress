# Governance Parameters

## What are Governance Parameters

Governance parameters dictate how other smart contracts in the community perform logics. For instance, parameter `bonding:liquidity_spread` controls the spread between buy and sell curve of the community's [Bonding Curve](/docs/bonding-curve.md). Governance parameters contract is deployed when a community is created. Developers can access the address of governance contract using band.js.

```javascript
// Get the community's governance parameters address
console.log(await communityClient.getParametersAddress());
```

### Breaking Down Governance Parameters

- Governance contract provides a simple `get(bytes32)` interface, where other contracts in the community can query for the information for their internal calculation.

- Community members can **propose** a change to one or more parameters. Once created, a proposal stays open for `params:min_expiration_time`.

- While a proposal is open, community members can vote to approve or reject the proposal. When the voting period ends, if (1) more than `params:min_particiation_pct` percentage of token participated in the vote and (2) more than `params:support_required_pct` percentage of participating token voted for approval, the proposal is approved and the change(s) are applied immediately.

- Governance parameters of the governance contract itself can also be voted and changed throught the exact same process, though the old values are used until the proposal is approved.

## Interacting with Contract

Anyone can propose a change in community parameters through band.js or by sending `propose` transaction to the governance contract. Note that proposal transaction requires IPFS hash encoding the reasoning behind the change, so that community members can evaluate the reasoning prior to conducting a vote.

```javascript
// Proposal a new proposal for changes in parameters
await commClient.createProposeTransaction({
  reasonHash: "Qm....", // IPFS hash of reasoning to propose this proposal
  keys: ["bonding:liquidity_spread"], // Keys to change
  values: ["30000000000000000"] // Values to change
});

// Vote for a proposal
await commClient.createCastVoteTransaction({
  proposalId: "1", // The ID of the proposal to vote for
  yesVote: "100000000000000000000", // Amount of token allocated to vote approval
  noVote: "0" // Amount of token allocated to vote rejection
});
```
