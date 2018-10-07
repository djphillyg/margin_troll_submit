import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  I128,
  U128,
  I256,
  U256,
  H256
} from "@graphprotocol/graph-ts";

export class Deposit extends EthereumEvent {
  get params(): DepositParams {
    return new DepositParams(this);
  }
}

export class DepositParams {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get beneficiary(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get bucket(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get amount(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get weight(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class Withdraw extends EthereumEvent {
  get params(): WithdrawParams {
    return new WithdrawParams(this);
  }
}

export class WithdrawParams {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get withdrawer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get bucket(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get weight(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get owedTokenWithdrawn(): U256 {
    return this._event.parameters[3].value.toU256();
  }

  get heldTokenWithdrawn(): U256 {
    return this._event.parameters[4].value.toU256();
  }
}

export class PrincipalIncreased extends EthereumEvent {
  get params(): PrincipalIncreasedParams {
    return new PrincipalIncreasedParams(this);
  }
}

export class PrincipalIncreasedParams {
  _event: PrincipalIncreased;

  constructor(event: PrincipalIncreased) {
    this._event = event;
  }

  get principalTotal(): U256 {
    return this._event.parameters[0].value.toU256();
  }

  get bucketNumber(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get principalForBucket(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get amount(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class PrincipalDecreased extends EthereumEvent {
  get params(): PrincipalDecreasedParams {
    return new PrincipalDecreasedParams(this);
  }
}

export class PrincipalDecreasedParams {
  _event: PrincipalDecreased;

  constructor(event: PrincipalDecreased) {
    this._event = event;
  }

  get principalTotal(): U256 {
    return this._event.parameters[0].value.toU256();
  }

  get bucketNumber(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get principalForBucket(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get amount(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class AvailableIncreased extends EthereumEvent {
  get params(): AvailableIncreasedParams {
    return new AvailableIncreasedParams(this);
  }
}

export class AvailableIncreasedParams {
  _event: AvailableIncreased;

  constructor(event: AvailableIncreased) {
    this._event = event;
  }

  get availableTotal(): U256 {
    return this._event.parameters[0].value.toU256();
  }

  get bucketNumber(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get availableForBucket(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get amount(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class AvailableDecreased extends EthereumEvent {
  get params(): AvailableDecreasedParams {
    return new AvailableDecreasedParams(this);
  }
}

export class AvailableDecreasedParams {
  _event: AvailableDecreased;

  constructor(event: AvailableDecreased) {
    this._event = event;
  }

  get availableTotal(): U256 {
    return this._event.parameters[0].value.toU256();
  }

  get bucketNumber(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get availableForBucket(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get amount(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class OwnershipRenounced extends EthereumEvent {
  get params(): OwnershipRenouncedParams {
    return new OwnershipRenouncedParams(this);
  }
}

export class OwnershipRenouncedParams {
  _event: OwnershipRenounced;

  constructor(event: OwnershipRenounced) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class OwnershipTransferred extends EthereumEvent {
  get params(): OwnershipTransferredParams {
    return new OwnershipTransferredParams(this);
  }
}

export class OwnershipTransferredParams {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BucketLender extends SmartContract {
  static bind(address: Address): BucketLender {
    return new BucketLender("BucketLender", address);
  }
}
