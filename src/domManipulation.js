import { BUTTONS, TIMING, WRONG_TEXT, WINNING_TEXT } from './constants';
import { getButtonsWithinCurrent, iterObj, formatStageNum } from './utils';
import { wrongButtonPressed } from './index';
import playSound from './sound';

let timeoutWaitId;
let Stopped = true;

const element = id => document.getElementById(id);

const addClassTo = (id, cls) => element(id).classList.add(cls);

const removeClassFrom = (id, cls) => element(id).classList.remove(cls);

const makeClickable = id => removeClassFrom(id, 'unclickable');

const makeButtonsClickable = () => iterObj(BUTTONS, makeClickable);

const makeUnclickable = id => addClassTo(id, 'unclickable');

const makeButtonsUnclickable = () => iterObj(BUTTONS, makeUnclickable);

const makeLit = id => addClassTo(id, 'light');

const makeUnlit = id => removeClassFrom(id, 'light');

export const isStopped = () => Stopped;

const twice = fn => {
  fn();
  fn();
};

const setTimeoutWait = () => {
  timeoutWaitId = setTimeout(wrongButtonPressed, TIMING.wait);
};

export const clearTimeoutWait = () => clearTimeout(timeoutWaitId);

const playButton = (button, buttons, duration) => {
  if (isStopped()) return;
  if (!button) {
    makeButtonsClickable();
    setTimeoutWait();
    return;
  }
  const buttonID = BUTTONS[button];
  makeLit(buttonID);
  playSound(button);
  setTimeout(() => {
    makeUnlit(buttonID);
    setTimeout(
      () => playButtons(buttons, duration), // eslint-disable-line no-use-before-define
      TIMING.between,
    );
  }, duration);
};

const playButtons = (buttons, duration) => {
  const [head, ...tail] = buttons;
  playButton(head, tail, duration);
};

const showStageMsg = msg => {
  const stageNode = element('stage');
  stageNode.innerText = msg;
};

const showStartMsg = msg => {
  const startNode = element('btn-start');
  startNode.innerText = msg;
};

const pressStart = () =>
  element('btn-start').dispatchEvent(new MouseEvent('click'));

const startOver = () => {
  twice(pressStart);
};

export const playButtonSeries = state => {
  const duration = TIMING.durations[state.currentStage - 1];
  playButtons(getButtonsWithinCurrent(state), duration);
};

export const buttonPressed = id => {
  makeLit(id);
  playSound(id.slice(4));
};

export const buttonUnpressed = id => {
  makeUnlit(id);
};

export const showStage = state => {
  showStageMsg(`Stage: ${formatStageNum(state.currentStage)}`);
};

export const gameStarted = state => {
  Stopped = false;
  showStage(state);
  showStartMsg('Stop');
  playButtonSeries(state);
};

export const gameStopped = () => {
  Stopped = true;
  makeButtonsUnclickable();
  showStageMsg('Stage: --');
  showStartMsg('Start');
};

export const advanceDom = state => {
  if (state.toTest === 0) {
    makeButtonsUnclickable();
    setTimeout(() => playButtonSeries(state), TIMING.before);
  } else setTimeoutWait();
  showStage(state);
};

export const wrongDom = state => {
  makeButtonsUnclickable();
  showStageMsg(WRONG_TEXT);
  playSound('wrong');
  setTimeout(() => {
    if (state.isStrict) {
      startOver();
    } else {
      gameStarted(state);
    }
  }, TIMING.wrong);
};

export const gameWon = () => {
  makeButtonsUnclickable();
  showStageMsg(WINNING_TEXT);
  playSound('win');
};
