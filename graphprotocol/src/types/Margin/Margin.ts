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

export class OperationStateChanged extends EthereumEvent {
  get params(): OperationStateChangedParams {
    return new OperationStateChangedParams(this);
  }
}

export class OperationStateChangedParams {
  _event: OperationStateChanged;

  constructor(event: OperationStateChanged) {
    this._event = event;
  }

  get from(): u8 {
    return this._event.parameters[0].value.toU8();
  }

  get to(): u8 {
    return this._event.parameters[1].value.toU8();
  }
}

export class PositionOpened extends EthereumEvent {
  get params(): PositionOpenedParams {
    return new PositionOpenedParams(this);
  }
}

export class PositionOpenedParams {
  _event: PositionOpened;

  constructor(event: PositionOpened) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get trader(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get lender(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get loanHash(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }

  get owedToken(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get heldToken(): Address {
    return this._event.parameters[5].value.toAddress();
  }

  get loanFeeRecipient(): Address {
    return this._event.parameters[6].value.toAddress();
  }

  get principal(): U256 {
    return this._event.parameters[7].value.toU256();
  }

  get heldTokenFromSell(): U256 {
    return this._event.parameters[8].value.toU256();
  }

  get depositAmount(): U256 {
    return this._event.parameters[9].value.toU256();
  }

  get interestRate(): U256 {
    return this._event.parameters[10].value.toU256();
  }

  get callTimeLimit(): u32 {
    return this._event.parameters[11].value.toU32();
  }

  get maxDuration(): u32 {
    return this._event.parameters[12].value.toU32();
  }

  get depositInHeldToken(): boolean {
    return this._event.parameters[13].value.toBoolean();
  }
}

export class PositionIncreased extends EthereumEvent {
  get params(): PositionIncreasedParams {
    return new PositionIncreasedParams(this);
  }
}

export class PositionIncreasedParams {
  _event: PositionIncreased;

  constructor(event: PositionIncreased) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get trader(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get lender(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get positionOwner(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get loanOwner(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get loanHash(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }

  get loanFeeRecipient(): Address {
    return this._event.parameters[6].value.toAddress();
  }

  get amountBorrowed(): U256 {
    return this._event.parameters[7].value.toU256();
  }

  get principalAdded(): U256 {
    return this._event.parameters[8].value.toU256();
  }

  get heldTokenFromSell(): U256 {
    return this._event.parameters[9].value.toU256();
  }

  get depositAmount(): U256 {
    return this._event.parameters[10].value.toU256();
  }

  get depositInHeldToken(): boolean {
    return this._event.parameters[11].value.toBoolean();
  }
}

export class PositionClosed extends EthereumEvent {
  get params(): PositionClosedParams {
    return new PositionClosedParams(this);
  }
}

export class PositionClosedParams {
  _event: PositionClosed;

  constructor(event: PositionClosed) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get closer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get payoutRecipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get closeAmount(): U256 {
    return this._event.parameters[3].value.toU256();
  }

  get remainingAmount(): U256 {
    return this._event.parameters[4].value.toU256();
  }

  get owedTokenPaidToLender(): U256 {
    return this._event.parameters[5].value.toU256();
  }

  get payoutAmount(): U256 {
    return this._event.parameters[6].value.toU256();
  }

  get buybackCostInHeldToken(): U256 {
    return this._event.parameters[7].value.toU256();
  }

  get payoutInHeldToken(): boolean {
    return this._event.parameters[8].value.toBoolean();
  }
}

export class CollateralForceRecovered extends EthereumEvent {
  get params(): CollateralForceRecoveredParams {
    return new CollateralForceRecoveredParams(this);
  }
}

export class CollateralForceRecoveredParams {
  _event: CollateralForceRecovered;

  constructor(event: CollateralForceRecovered) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get recipient(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): U256 {
    return this._event.parameters[2].value.toU256();
  }
}

export class MarginCallInitiated extends EthereumEvent {
  get params(): MarginCallInitiatedParams {
    return new MarginCallInitiatedParams(this);
  }
}

export class MarginCallInitiatedParams {
  _event: MarginCallInitiated;

  constructor(event: MarginCallInitiated) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get lender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get requiredDeposit(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class MarginCallCanceled extends EthereumEvent {
  get params(): MarginCallCanceledParams {
    return new MarginCallCanceledParams(this);
  }
}

export class MarginCallCanceledParams {
  _event: MarginCallCanceled;

  constructor(event: MarginCallCanceled) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get lender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get owner(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get depositAmount(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class LoanOfferingCanceled extends EthereumEvent {
  get params(): LoanOfferingCanceledParams {
    return new LoanOfferingCanceledParams(this);
  }
}

export class LoanOfferingCanceledParams {
  _event: LoanOfferingCanceled;

  constructor(event: LoanOfferingCanceled) {
    this._event = event;
  }

  get loanHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get payer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get feeRecipient(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get cancelAmount(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class AdditionalCollateralDeposited extends EthereumEvent {
  get params(): AdditionalCollateralDepositedParams {
    return new AdditionalCollateralDepositedParams(this);
  }
}

export class AdditionalCollateralDepositedParams {
  _event: AdditionalCollateralDeposited;

  constructor(event: AdditionalCollateralDeposited) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get amount(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get depositor(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class LoanTransferred extends EthereumEvent {
  get params(): LoanTransferredParams {
    return new LoanTransferredParams(this);
  }
}

export class LoanTransferredParams {
  _event: LoanTransferred;

  constructor(event: LoanTransferred) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class PositionTransferred extends EthereumEvent {
  get params(): PositionTransferredParams {
    return new PositionTransferredParams(this);
  }
}

export class PositionTransferredParams {
  _event: PositionTransferred;

  constructor(event: PositionTransferred) {
    this._event = event;
  }

  get positionId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
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

export class Margin extends SmartContract {
  static bind(address: Address): Margin {
    return new Margin("Margin", address);
  }
}
