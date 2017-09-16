import {
  BUTTONS,
  TIMEOUT_WAIT,
  TIMEOUTS,
  WRONG_TEXT,
  WINNING_TEXT,
} from './constants';
import { getButtonsWithinCurrent, iterObj, formatStageNum } from './utils';
import { wrongButtonPressed } from './index';
import playSound from './sound';

let timeoutWaitId;

const element = id => document.getElementById(id);

const addClassTo = (id, cls) => element(id).classList.add(cls);

const removeClassFrom = (id, cls) => element(id).classList.remove(cls);

const makeClickable = id => removeClassFrom(id, 'unclickable');

const makeButtonsClickable = () => iterObj(BUTTONS, makeClickable);

const makeUnclickable = id => addClassTo(id, 'unclickable');

const makeButtonsUnclickable = () => iterObj(BUTTONS, makeUnclickable);

const makeLit = id => addClassTo(id, 'light');

const makeUnlit = id => removeClassFrom(id, 'light');

const playButton = (button, buttons, timeout) => {
  if (!button) {
    makeButtonsClickable();
    timeoutWaitId = setTimeout(wrongButtonPressed, TIMEOUT_WAIT);
    return;
  }
  const buttonID = BUTTONS[button];
  makeLit(buttonID);
  playSound(button);
  setTimeout(() => {
    makeUnlit(buttonID);
    setTimeout(
      () => playButtons(buttons, timeout), // eslint-disable-line no-use-before-define
      150,
    );
  }, timeout);
};

const playButtons = (buttons, timeout) => {
  const [head, ...tail] = buttons;
  playButton(head, tail, timeout);
};

const showStageMsg = msg => {
  const stageNode = element('stage');
  stageNode.innerText = msg;
};

const startOver = () =>
  element('btn-start').dispatchEvent(new MouseEvent('click'));

export const playButtonSeries = state => {
  const timeout = TIMEOUTS[state.currentStage - 1];
  playButtons(getButtonsWithinCurrent(state), timeout);
};

export const buttonPressed = id => {
  makeLit(id);
  playSound(id.slice(4));
  clearTimeout(timeoutWaitId);
};

export const buttonUnpressed = id => {
  makeUnlit(id);
};

export const showStage = state => {
  showStageMsg(`Stage: ${formatStageNum(state.currentStage)}`);
};

export const advanceDom = state => {
  if (state.toTest === 0) makeButtonsUnclickable();
  else timeoutWaitId = setTimeout(wrongButtonPressed, TIMEOUT_WAIT);
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
      showStage(state);
    }
  }, 2000);
};

export const gameWon = () => {
  makeButtonsUnclickable();
  showStageMsg(WINNING_TEXT);
  playSound('win');
};
