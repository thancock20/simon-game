import { BUTTONS, TIMEOUTS } from './constants';
import { getButtonsWithinCurrent, iterObj, formatStageNum } from './utils';
import playSound from './sound';

const element = Id => document.getElementById(Id);

const playButton = timeout => (button, index) => {
  // console.log(BUTTONS[button]);
  const buttonNode = element(BUTTONS[button]);
  setTimeout(() => {
    buttonNode.classList.add('light');
    playSound(button);
  }, timeout * index);
  setTimeout(
    () => buttonNode.classList.remove('light'),
    timeout * (index + 1) - timeout / 5,
  );
};

const playButtons = (buttons, timeout) => {
  buttons.forEach(playButton(timeout));
};

const makeClickable = ID => {
  const node = element(ID);
  node.classList.remove('unclickable');
};

const makeButtonsClickable = () => {
  iterObj(BUTTONS, makeClickable);
};

const showStageMsg = msg => {
  const stageNode = element('stage');
  stageNode.innerText = msg;
};

export const playButtonSeries = state => {
  const timeout = TIMEOUTS[state.currentStage];
  playButtons(getButtonsWithinCurrent(state), timeout);
  setTimeout(makeButtonsClickable, timeout);
};

export const showStage = state => {
  showStageMsg(`Stage: ${formatStageNum(state.currentStage)}`);
};
