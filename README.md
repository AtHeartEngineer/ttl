# TTL Proof

This is a circuit that will prove that a peer in a decentralized network has incremented a TTL before forwarding a message.

This is part of a larger project (zk-chat) and is just an idea we are exploring [here](https://hackmd.io/dX1qoy6cTtSXJ7TdB8muIw#TTL)

## Problem(s)

In order to enforce a TTL on an anonymous message, you need to prove that each hop is accounted for.

We want to be able to make some guarantees about the TTL of a message:

1. The TTL is incremented by 1 at each hop.
2. The TTL was incremented by unique peers.

## Approaches

### Semaphore Approach

* Use semaphore to prove their id commitment is registered.
    * There is some nuance here since we will be dealing with multiple registration "tiers".
    * TODO! Should a user, when they register, be included in all the lower registration tiers? Or should a proof input specify the registration tier?
* Use a circuit to prove that the TTL was incremented by 1.
* Prove that each hop was done by a unique idcommitment.

### Recursive Snarks?

Use a recursive snark to prove that the TTL was incremented by 1 for each hop by a unique idcommitment?

### BLS Signatures?

Aggregate BLS signatures per hop?