import { getTimeouts } from './utils';

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
export const WRONG_TEXT = 'WRONG!!!';

/**
 * # Timout values for stages
 * @readonly
 * @type {Array.<number>}
 */
const TIMEOUT_VALUES = [1000, 750, 500, 250];

/**
 * # Timeouts for stages
 * @readonly
 * @type {Array.<number>}   Array where _index_ is **stage number** and
 *                                      _value_ is **timeout** in milliseconds
 */
export const TIMEOUTS = getTimeouts(FINAL_STAGE, TIMEOUT_VALUES);

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
