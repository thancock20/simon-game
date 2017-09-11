import 'babel-polyfill';

import initialState from './initialState';

import { setStrict } from './utils';
import { playButtonSeries } from './domManipulation';

let state = {};

function handleStrictSwitch(event) {
  state = setStrict(state, event.target.checked);
}

const strictSwitch = document.querySelector('#myonoffswitch');
strictSwitch.addEventListener('change', handleStrictSwitch);

function handleStartButton() {
  state = setStrict(initialState(), strictSwitch.checked);
  playButtonSeries(state);
}

const startButton = document.querySelector('#btn-start');
startButton.addEventListener('click', handleStartButton);
