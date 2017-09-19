import { BUTTONS, TIMING, WRONG_TEXT, WINNING_TEXT } from './constants';
import { getButtonsWithinCurrent, iterObj, formatStageNum } from './utils';
import { wrongButtonPressed } from './index';
import playSound from './sound';

const element = id => document.getElementById(id);

const addClassTo = (id, cls) => element(id).classList.add(cls);

const removeClassFrom = (id, cls) => element(id).classList.remove(cls);

const makeClickable = id => removeClassFrom(id, 'unclickable');

const makeButtonsClickable = () => iterObj(BUTTONS, makeClickable);

const makeUnclickable = id => addClassTo(id, 'unclickable');

const makeButtonsUnclickable = () => iterObj(BUTTONS, makeUnclickable);

const makeLit = id => addClassTo(id, 'light');

const makeButtonsLit = () => iterObj(BUTTONS, makeLit);

const makeUnlit = id => removeClassFrom(id, 'light');

const makeButtonsUnlit = () => iterObj(BUTTONS, makeUnlit);

export const isStopped = () => element('btn-start').innerText !== 'Stop';

const twice = fn => {
  fn();
  fn();
};

// Temp. variable to hold ID for wait timeout, so it can be cleared
// Used only in `setTimeoutWait` and `clearTimeoutWait`
let timeoutWaitId;

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
  const sound = playSound(button);
  setTimeout(() => {
    makeUnlit(buttonID);
    sound.stop();
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
  element('stage').innerText = msg;
};

const showStartMsg = msg => {
  element('btn-start').innerText = msg;
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

// Temp. variable to hold ID for sound, so it can be stopped
// Used only in `buttonPressed` and `buttonUnpressed`
let buttonPressedSound;

export const buttonPressed = id => {
  makeLit(id);
  buttonPressedSound = playSound(id.slice(4));
};

export const buttonUnpressed = id => {
  makeUnlit(id);
  buttonPressedSound.stop();
};

export const showStage = state => {
  showStageMsg(`Stage: ${formatStageNum(state.currentStage)}`);
};

export const gameStarted = state => {
  showStage(state);
  showStartMsg('Stop');
  playButtonSeries(state);
};

export const gameStopped = () => {
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
  const sound = playSound('wrong');
  makeLit(`btn-${state.lastWrong}`);
  setTimeout(() => {
    sound.stop();
    makeUnlit(`btn-${state.lastWrong}`);
    setTimeout(() => {
      if (state.isStrict) startOver();
      else gameStarted(state);
    }, TIMING.before);
  }, TIMING.wrong);
};

export const gameWon = () => {
  makeButtonsUnclickable();
  setTimeout(() => {
    showStageMsg(WINNING_TEXT);
    const sound = playSound('win');
    makeButtonsLit();
    setTimeout(() => {
      showStageMsg('Stage: --');
      showStartMsg('Start');
      sound.stop();
      makeButtonsUnlit();
    }, TIMING.wrong);
  }, TIMING.before);
};
