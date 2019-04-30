# Token Curated Registry

[Token Curated Registry (TCR)](https://medium.com/@ilovebagels/token-curated-registries-1-0-61a232f8dac7) is a method for a community to collectively curate a **list** of data directly. It is suitable for curating a more relatively subjective information in the form of list that requires community-wide opinion.

## Breaking Down TCR

- An applicant **applies** for an entry to be listed on the TCR by staking `min_deposit` community token. The entry becomes `listed` if it is not challenged for `apply_stage_length` duration.

- A community member can **challenge** an entry by staking a matching deposit. The entry then goes to a voting period. Using [Commit-Reveal Voting](https://medium.com/gitcoin/commit-reveal-scheme-on-ethereum-25d1d1a25428), token holders vote to approve or reject the challenge.

- If less than `min_participation_pct` of tokens participated, the challenge is considered inconclusive. The stake is returned back to the challenger, and the entry stays on the TCR.

- If enough tokens participate and more than `support_required_pct` vote in favor of the challenge, the entry is removed and the entry's deposit becomes challenger's reward. The challenger receives `dispensation_percentage` percent, while the winning voters get the remaining.

- On the other hand, if the challenge fails, the challenger's stake is confiscated and split among the entry owner and voters that reject the challenge. The entry owner receives `dispensation_percentage` percent, while the winning voters get the remaining.

## Creating New TCR

A TCR can be created by invoking `createTCR` transaction on the community's primary smart contract, with the initial configuration of TCR parameters. The process can be done either through band.js or by sending the transaction directly to the blockchain.

### TCR Parameters

All of the TCR parameters live under namespace specified by `prefix` parameter (e.g. if prefix is `tcr:` then the parameters are `tcr:apply_stage_length`, `tcr:dispensation_percentage`, etc). The parameters can be changed through the community's governance smart contracts.

|         Parameter         |                           Description                           |
| :-----------------------: | :-------------------------------------------------------------: |
|   `apply_stage_length`    |      The time pending before an entry is listed in the TCR      |
|       `min_deposit`       |   Minimum amount of token required for an entry to be listed    |
| `dispensation_percentage` |     Percentage of reward going to entry owner or challenger     |
|       `commit_time`       |            Duration in seconds of the commit period             |
|       `reveal_time`       |            Duration in seconds of the reveal period             |
|  `min_participation_pct`  | Min percentage of participants required to vote for a challenge |
|  `support_required_pct`   |     Threshold to determine if a challenge succeeds or fails     |

```javascript
const tcrClient = await communityClient.createTCR({
  prefix: "tcr:",
  //  if x <= 604800:
  //    return 100e16 - (90e16 * x) / 604800
  //  else:
  //    return 10e16
  decayFunction: [
    18,
    14,
    1,
    0,
    604800,
    5,
    0,
    "1000000000000000000",
    7,
    6,
    0,
    "900000000000000000",
    1,
    0,
    604800,
    0,
    "100000000000000000"
  ],
  minDeposit: "100000000000000000000",
  applyStageLength: "21600",
  dispensationPercentage: "500000000000000000",
  commitTime: "43200",
  revealTime: "3600",
  minParticipationPct: "100000000000000000",
  supportRequiredPct: "500000000000000000"
});
```

## Sending TCR Transactions

Similar to other parts of Band Protocol, band.js can be used to issue transactions related to TCR and send them to the blockchain. The following actions can be performed by a TCR entry owner.

```javascript
// Apply for a new TCR entry
await tcrClient
  .createApplyTransaction({
    dataHash: "Qm....", // Hash of data entry
    amount: "100000000000000000000" // Initial token deposit with entry
  })
  .send();

// Deposit more token to an existing entry
await tcrClient
  .createDepositTransaction({
    dataHash: "Qm....", // Hash of data entry
    amount: "100000000000000000000" // Amount of token to withdraw
  })
  .send();

// Withdraw token out of an existing entry
await tcrClient
  .createWithdawTransaction({
    dataHash: "Qm....", // Hash of data entry
    amount: "100000000000000000000" // Initial token deposit with entry
  })
  .send();

// Remove an entry owned by me from the TCR and get the stake back
await tcrClient.createExitTransaction("Qm....").send();
```

Other community members can interact with a TCR entry by sending `challenge` transaction, which will initiate a challenge for the entry. The challenge will then go through commit-reveal period, during which the community members collectively decide if the challenge will succeed.

```javascript
// Challenge an existing entry
await tcrClient
  .createChallengeTransaction({
    entryHash: "Qm....", // Hash of data entry
    reasonHash: "Qm....", // Hash of reason to challenge the entry
    amount: "100000000000000000000" // Token to stake for the challenge
  })
  .send();

// Commit a vote to a challenge
await tcrClient
  .createCommitVoteTransaction({
    challengeId: "1", // The ID of the challenge to commit vote for
    commitHash: "0x...", // Hash of commit value which is sha3(yesWeight,noWeight,nonce)
    totalWeight: "50000000000000000000" // The total voting power spent on voting
  })
  .send();

// Reveal a committed vote after commit period ends
await tcrClient.createRevealVoteTransaction({
  challengeId: "1", // The ID of the challenge to commit vote for
  yesVote: "50000000000000000000", // Voting power allocated in favor of the challenge
  noVote: "0", // Voting power allocated against  the challenge
  salt: "0x...." // Secret salt used to obfuscate voting information
});
```
