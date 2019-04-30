# Bonding Curve

Band Protocol utilizes the concept of [Continuous Bonding Curve](https://medium.com/@simondlr/tokens-2-0-curved-token-bonding-in-curation-markets-1764a2e0bee5) to control community token supply and ensure that the token always have concrete value attached to it.

## Breaking Down Bonding Curve

- During community creation, the creator specifies the bonding curve of the community. This bonding curve stays with the community throughout its lifetime.

- Whenever someone wants to buy community token, he or she sends BAND token as collateral to the bonding curve contract. The contract mints and sends back new community token so that the new token supply is consistent with the bonding curve.

- As the supply of the community token grows, the token becomes more expensive. This is due to that fact that bonding curve is designed to be [Convex Function](https://en.wikipedia.org/wiki/Convex_function).

- On the other hand, anyone can sell buy sending community token back to the contract. The contract burns the token and returns back BAND so that the collateral BAND is consistent with the new supply.

## Bonding Curve Representation

Bonding curve is represented as a mathematical expression with one variable. Given the supply of community token, the expression evaluates to the amount of BAND needed to be collateralized in the system. You can learn more about the encoding process from our [Blog Post](https://medium.com/bandprotocol/encoding-and-evaluating-mathematical-expression-in-solidity-f1bb062fa86e) and [Video Explanation](https://www.youtube.com/watch?v=1rBSn6aC2mQ).

### Example Bonding Curve Expression

The following expression is used to deploy the four pilot data communities of Band Protocol. The expression represents a polynomial function with a degree of 5 (20% reserve ratio), and with a coefficient to force the token supply to be `1000000` when the first `20000` BAND is put as collateral.

```javascript
const collateralEquation = [
  "18",
  "12",
  "1",
  "0",
  "228652525963663850000000",
  "7",
  "6",
  "0",
  "12500000000000188000",
  "1",
  "0",
  "228652525963663850000000",
  "20",
  "0",
  "12500000000000188000",
  "1",
  "0",
  "228652525963663850000000",
  "0",
  "5000000"
];
```

## Buy and Sell Community Token

Community token can be bought or sold using band.js, or by sending `buy` or `sell` transaction to the bonding curve contract. Note that when buying or selling, price limit needs to be specified. A transactions will fail if buying token costs more than the price limit, or if selling token gives less than the price limit. Those situations can happen when multiple independent parties try to interact with the bonding curve concurrently.

```javascript
// Get the community's bonding curve address
console.log(await communityClient.getBondingCurveAddress());

// Buy 1 community token, with price limit of 10 BAND
await communityClient
  .createBuyTransaction({
    amount: "1000000000000000000", // 1 community token
    priceLimit: "10000000000000000000" // 10 BAND
  })
  .send();

// Sell 1 community token, with price limit of 0.1 BAND
await communityClient
  .createSellTransaction({
    amount: "1000000000000000000", // 1 community token
    priceLimit: "100000000000000000" // 0.1 BAND
  })
  .send();
```

## Liquidity Spread

Liquidity spread controls the difference between buying and selling prices of community token. The variable can be set via [Governance Parameters](/docs/parameters.md) under name `bonding:liquidity_spread`. High liquidity spread makes it more difficult for malicious actors to perform [Front-running Attacks](https://en.wikipedia.org/wiki/Front_running). However, high spread also leads to community members receive less BAND when they cash out their community token. Revenue from liquidity spread is sent to address specified by parameter `bonding:revenue_beneficiary`. The default value is the address that created the community.
