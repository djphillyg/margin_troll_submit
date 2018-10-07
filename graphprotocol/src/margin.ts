import 'allocator/arena'
export { allocate_memory }

import { ByteArray, Entity, store, crypto } from '@graphprotocol/graph-ts'
import {
  PositionOpened,
  PositionIncreased,
  PositionClosed,
  CollateralForceRecovered,
  MarginCallInitiated,
  MarginCallCanceled,
} from './types/Margin/Margin'
import { AvailableIncreased } from './types/BucketLender/BucketLender';
const myPosition: string = '0x049ae553967042b7c81d64538045a2040a79e64ff9c53ee8f320c3d13edc47f5';
// handler for positionOpened events
export function handlePositionOpened(event: PositionOpened): void {
  let positionId = event.params.positionId.toHex()
  // create position
  let position = new Entity();
  position.setString('id', positionId);
  position.setAddress('trader', event.params.trader);
  position.setAddress('lender', event.params.lender);
  position.setAddress('owedToken', event.params.owedToken);
  position.setAddress('heldToken', event.params.heldToken);
  position.setU256('depositAmount', event.params.depositAmount);
  position.setU256('principal', event.params.principal);
  position.setU256('interestRate', event.params.interestRate);
  position.setInt('callTimeLimit', event.params.callTimeLimit);
  position.setInt('maxDuration', event.params.maxDuration);
  position.setBoolean('collateralForceRecovered', false);
  position.setBoolean('isClosed', false);
  position.setBoolean('isMarginCalled', false);
  store.set('Position', positionId, position);
}

export function handlePositionIncreased(event: PositionIncreased): void {
  let positionId = event.params.positionId.toHex();
  let positionIncrease = new Entity();
  positionIncrease.setString('id', positionId);
  positionIncrease.setString('position', positionId);
  positionIncrease.setAddress('trader', event.params.trader);
  positionIncrease.setAddress('lender', event.params.lender);
  positionIncrease.setU256('timestamp', event.block.timestamp);
  positionIncrease.setU256('amountBorrowed', event.params.amountBorrowed);
  positionIncrease.setU256('principalAdded', event.params.principalAdded);
  positionIncrease.setU256('heldTokenFromSell', event.params.heldTokenFromSell);
  positionIncrease.setU256('depositAmount', event.params.depositAmount);
  positionIncrease.setBoolean('depositInHeldToken', event.params.depositInHeldToken);
  store.set('PositionIncrease', positionId, positionIncrease);
}

export function handlePositionClosed(event: PositionClosed): void {
  let positionId = event.params.positionId.toHex();
  let positionClosed = new Entity();
  positionClosed.setString('id', positionId);
  positionClosed.setString('position', positionId);
  positionClosed.setBoolean('collateralForceRecovered', false);
  positionClosed.setU256('timestamp', event.block.timestamp);
  positionClosed.setAddress('closer', event.params.closer);
  positionClosed.setU256('closeAmount', event.params.closeAmount);
  positionClosed.setU256('remainingAmount', event.params.remainingAmount);
  positionClosed.setU256('owedTokenPaidToLender', event.params.owedTokenPaidToLender);
  positionClosed.setU256('payoutAmount', event.params.payoutAmount);
  positionClosed.setU256('buybackCostInHeldToken', event.params.buybackCostInHeldToken);
  positionClosed.setBoolean('payoutInHeldToken', event.params.payoutInHeldToken);
  store.set('PositionClosed', positionId, positionClosed);

  let position = new Entity();
  position.setBoolean('isClosed',true);
  position.setU256('positionClosedAt', event.block.timestamp);
  position.setString('closedInfo', positionId);
  store.set('Position', positionId, position);
}

export function handleCollateralForceRecovered(event: CollateralForceRecovered): void {
  let positionId = event.params.positionId.toHex();
  let positionClosed = new Entity();
  positionClosed.setString('id', positionId);
  positionClosed.setString('position', positionId);
  positionClosed.setU256('timestamp', event.block.timestamp);
  positionClosed.setBoolean('collateralForceRecovered', true);
  store.set('PositionClosed', positionId, positionClosed);

  let position = new Entity();
  position.setBoolean('isClosed', true);
  position.setBoolean('collateralForceRecovered', true);
  store.set('Position', positionId, position);
}

export function handleMarginCallInitiated(event: MarginCallInitiated): void {
  let positionId = event.params.positionId.toHex();
  let marginCall = new Entity();
  marginCall.setString('id', positionId);
  marginCall.setString('position', positionId);
  marginCall.setU256('timestamp', event.block.timestamp);
  marginCall.setBoolean('isCancelled', false);
  marginCall.setU256('requiredDeposit', event.params.requiredDeposit);
  store.set('MarginCall', positionId, marginCall);
  let position = new Entity();
  position.setBoolean('isMarginCalled', true);
  position.setU256('marginCallStartAt', event.block.timestamp);
  position.setString('marginCall', positionId);
  store.set('Position', positionId, position);
}

export function handleMarginCallCanceled(event: MarginCallCanceled): void {
  let positionId = event.params.positionId.toHex();
  let cancelMarginCall = new Entity();
  cancelMarginCall.setString('id', positionId);
  cancelMarginCall.setString('position', positionId);
  cancelMarginCall.setU256('timestamp', event.block.timestamp);
  cancelMarginCall.setBoolean('isCancelled', true);
  cancelMarginCall.setU256('depositAmount', event.params.depositAmount);
  store.set('MarginCall', positionId, cancelMarginCall);

  let position = new Entity();
  position.setBoolean('isMarginCalled', false);
  position.unset('marginCallStartAt');
  position.setString('marginCall', positionId);
  store.set('Position', positionId, position);
}

export function handleBucketIncrease(event: AvailableIncreased): void {
  let bucketDeposit = new Entity();
  bucketDeposit.setString('id', myPosition);
  bucketDeposit.setU256('amount', event.params.amount);
  bucketDeposit.setU256('timestamp', event.block.timestamp);
  bucketDeposit.setU256('availableTotal', event.params.availableTotal);
  store.set('BucketIncrease', myPosition, bucketDeposit);
}
