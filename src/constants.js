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
  blue: 329.63,
  green: 164.81,
  red: 220.0,
  yellow: 277.18,
  wrong: 42,
  win: 'TODO',
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
