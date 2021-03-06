import 'babel-polyfill';

import initialState from './initialState';

import { FINAL_STAGE } from './constants';
import { setStrict, testButtonPress, advanceState, wrongState } from './utils';
import {
  isStopped,
  clearTimeoutWait,
  buttonPressed,
  buttonUnpressed,
  advanceDom,
  wrongDom,
  gameWon,
  gameStarted,
  gameStopped,
} from './domManipulation';

let state = {};

function handleStrictSwitch(event) {
  state = setStrict(state, event.target.checked);
}

const strictSwitch = document.querySelector('#myonoffswitch');
strictSwitch.addEventListener('change', handleStrictSwitch);

function handleStartButton() {
  clearTimeoutWait();
  if (isStopped()) {
    state = setStrict(initialState(), strictSwitch.checked);
    gameStarted(state);
  } else {
    gameStopped();
  }
}

const startButton = document.querySelector('#btn-start');
startButton.addEventListener('click', handleStartButton);

// eslint-disable-next-line import/prefer-default-export
export function wrongButtonPressed() {
  state = wrongState(state);
  wrongDom(state);
}

function correctButtonPressed() {
  state = advanceState(state);
  if (state.currentStage > FINAL_STAGE) gameWon();
  else advanceDom(state);
}

function handleSimonButtonsUp(event) {
  event.preventDefault();
  event.target.removeEventListener('touchend', handleSimonButtonsUp);
  event.target.removeEventListener('mouseup', handleSimonButtonsUp);
  event.target.removeEventListener('mouseout', handleSimonButtonsUp);
  buttonUnpressed(event.target.id);
  state = testButtonPress(event.target.id, state);
  if (state.isCorrect) correctButtonPressed();
  else wrongButtonPressed();
}

function handleSimonButtonsDown(event) {
  event.preventDefault();
  if (event.target.className !== 'simon-button') return;
  clearTimeoutWait();
  event.target.addEventListener('touchend', handleSimonButtonsUp);
  event.target.addEventListener('mouseup', handleSimonButtonsUp);
  event.target.addEventListener('mouseout', handleSimonButtonsUp);
  buttonPressed(event.target.id);
}

const simonButtons = document.querySelector('#simon-buttons');
simonButtons.addEventListener('touchstart', handleSimonButtonsDown);
simonButtons.addEventListener('mousedown', handleSimonButtonsDown);
