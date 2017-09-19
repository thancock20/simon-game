import { getDurations } from './utils';

/**
 * # The final stage of the game
 * @readonly
 * @type {Number}
 */
export const FINAL_STAGE = 20;

/**
 * # Text used throughout game
 * @readonly
 * @enum {String}
 */
export const TEXT = {
  startButtonStopped: 'Start', // also change index.html
  startButtonStarted: 'Stop',
  stagePrefix: 'Stage: ', // also change index.html
  stageEmpty: '--', // also change index.html
  stageWinning: 'YOU WIN!!',
  stageWrong: 'TOO BAD!!',
};

/**
 * # Duration values for stages
 * @readonly
 * @type {Array.<number>}
 *
 */
const DURATION_VALUES = [520, 420, 320, 220];

/**
 * # Game timings in milliseconds
 * @readonly
 * @type {Object}
 */
export const TIMING = {
  before: 800, // before series starts to play
  between: 50, // between buttons during playing series
  wait: 3000, // wait time after series plays
  wrong: 1500, // duration of wrong buzzer
  // durations of buttons, in each stage
  durations: getDurations(FINAL_STAGE, DURATION_VALUES),
};

/**
 * # Frequencies of sounds used for gameplay
 * @readonly
 * @enum {number}
 */
export const SOUNDS = {
  blue: 329.63,
  green: 164.81,
  red: 220.0,
  yellow: 277.18,
  wrong: 42,
  win: 440,
};

/**
 * # A button press
 * @typedef {string} ButtonPress id of the button pressed
 * @see {@link BUTTONS}
 */

/**
 * # Ids of the colored buttons
 * @readonly
 * @enum {ButtonPress}
 * **Any changes should be reflected in index.html**
 */
export const BUTTONS = {
  blue: 'btn-blue',
  green: 'btn-green',
  red: 'btn-red',
  yellow: 'btn-yellow',
};
