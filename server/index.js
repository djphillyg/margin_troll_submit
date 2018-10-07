import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import ws from 'ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'unfetch';
import Twitter from 'twitter';
import gql from 'graphql-tag';
import BigNumber from 'bignumber.js';
import { DateTime } from 'luxon';

const wsUri = 'ws://localhost:8001/margin';

const wsClient = new SubscriptionClient(
  wsUri,
  {
    reconnect: true
  },
  ws
);

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/margin/graphql',
  fetch: fetch,
  headers: {
    'Content-Type': 'application/json'
  }
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8001/margin',
//   options: {
//     reconnect: true
//   },
// });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  new WebSocketLink(wsClient),
  httpLink,
);

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache({ addTypename: false }),
});

const shortName = 'ethSF sWETH 10/30';

const bucketQuery = gql`subscription {
  bucketIncrease(id: "0x049ae553967042b7c81d64538045a2040a79e64ff9c53ee8f320c3d13edc47f5") {
    availableTotal
    amount
    timestamp
  }
}`;

apolloClient.subscribe({
  query: bucketQuery,
  variables: {}
}).subscribe({
  next(data) {
    console.log(data.data.bucketIncrease);
    const availableTotal = new BigNumber(data.data.bucketIncrease.availableTotal).div('1e18').toString();
    const amount = new BigNumber(data.data.bucketIncrease.amount).div('1e18').toString();
    const bucketTweet = `${shortName} has ${amount}DAI added,increasing lending liquidity to ${availableTotal}Ξ`;
    postTweet(increaseTweet);
  }
});
const closedQuery = gql`subscription {
  positionClosed(id: "0x049ae553967042b7c81d64538045a2040a79e64ff9c53ee8f320c3d13edc47f5") {
    payoutAmount
    remainingAmount
  }
}`;
apolloClient.subscribe({
  query: closedQuery,
  variables: {}
}).subscribe({
  next(data) {
    console.log(data.data.positionClosed);
    const payoutAmount = new BigNumber(data.data.positionClosed.payoutAmount).div('1e18').toString();
    const closeAmount = new BigNumber(data.data.positionClosed.closeAmount).div('1e18').toString();
    const closeTweet = `${shortName} has been closed, with a payout of ${payoutAmount}Ξ, with ${remainingAmount}DAI remaining`;
    postTweet(closeTweet);
  }
});

const marginQuery = gql`subscription {
  marginCall(id: "0x049ae553967042b7c81d64538045a2040a79e64ff9c53ee8f320c3d13edc47f5") {
    timestamp
    requiredDeposit
  }
}`;

apolloClient.subscribe({
  query: marginQuery,
  variables: {}
}).subscribe({
  next(data) {
    console.log(data.data.marginCall);
    const requiredDeposit = new BigNumber(data.data.marginCall.requiredDeposit).div('1e18').toString();
    const marginTweet = `${shortName} has been margin called, with a deposit of ${requiredDeposit}`;
    postTweet(marginTweet);
  }
});

const increaseQuery = gql`subscription {
  positionIncrease(id: "0x049ae553967042b7c81d64538045a2040a79e64ff9c53ee8f320c3d13edc47f5") {
    principalAdded
    depositAmount
  }
}`;


apolloClient.subscribe({
  query: increaseQuery,
  variables: {}
}).subscribe({
  next(data) {
    console.log(data.data.PositionIncrease);
    const principalAdded = new BigNumber(data.data.PositionIncrease.principalAdded).div('1e18').toString();
    const depositAmount = new BigNumber(data.data.PositionIncrease.depositAmount).div('1e18').toString();
    const increaseTweet = `${shortName} has ${depositAmount}DAI added,increasing principal to ${principalAdded}Ξ`;
    postTweet(increaseTweet);
  }
});


function postTweet(myStatus) {
  client.post('statuses/update', { status: myStatus }, function(error, tweet, response) {
    if (error) {
      console.log(error);
      throw error
    }
    console.log(tweet);
  });
}

export const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
});
