import { BUTTONS, TIMEOUTS } from './constants';
import { getButtonsWithinCurrent } from './utils';

const playButton = timeout => (button, index) => {
  // console.log(BUTTONS[button]);
  const buttonNode = document.getElementById(BUTTONS[button]);
  setTimeout(() => buttonNode.classList.add('light'), timeout * index);
  setTimeout(
    () => buttonNode.classList.remove('light'),
    timeout * (index + 1) - timeout / 5,
  );
};

const playButtons = (buttons, timeout) => {
  buttons.forEach(playButton(timeout));
};

const makeClickable = ID => {
  const node = document.getElementById(ID);
  node.classList.remove('unclickable');
};

const makeButtonsClickable = () => {
  Object.values(BUTTONS).forEach(makeClickable);
};

export const playButtonSeries = state => {
  const timeout = TIMEOUTS[state.currentStage];
  playButtons(getButtonsWithinCurrent(state), timeout);
  setTimeout(makeButtonsClickable, timeout);
};

export const a = 0;
