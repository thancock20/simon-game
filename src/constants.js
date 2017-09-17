import { getDurations } from './utils';

/**
 * # The final stage of the game
 * @readonly
 * @type {Number}
 */
export const FINAL_STAGE = 20;

/**
 * # The text that appears when the final stage is beat
 * @readonly
 * @type {String}
 */
export const WINNING_TEXT = 'YOU WIN!!';

/**
 * # The text that appears when a wrong button is pressed
 * @readonly
 * @type {String}
 */
export const WRONG_TEXT = 'TOO BAD!!';

/**
 * # Duration values for stages
 * @readonly
 * @type {Array.<number>}
 *
 */
const DURATION_VALUES = [520, 420, 320, 220];

export const TIMING = {
  before: 800,
  between: 50,
  wait: 3000,
  wrong: 1500,
  durations: getDurations(FINAL_STAGE, DURATION_VALUES),
};

/**
 * # Paths to sounds used for gameplay
 * @readonly
 * @enum {string}
 */
export const SOUNDS = {
  blue: './dist/sounds/blue.mp3',
  green: './dist/sounds/green.mp3',
  red: './dist/sounds/red.mp3',
  yellow: './dist/sounds/yellow.mp3',
  wrong: './dist/sounds/wrong.mp3',
  win: './dist/sounds/win.mp3',
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
 */
export const BUTTONS = {
  blue: 'btn-blue',
  green: 'btn-green',
  red: 'btn-red',
  yellow: 'btn-yellow',
};
