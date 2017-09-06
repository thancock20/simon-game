import { FINAL_STAGE, BUTTONS } from './constants';

/**
 * # A stage of the game
 * @typedef {number} Stage Number from `1` through `FINAL_STAGE`
 */

/**
 * # The current stage of the game
 * @type {Stage} Initial value should be `1`
 */
const currentStage = 1;

/**
 * # Series of correct button presses in order
 * @type {Array.<ButtonPress>} `length` of array should be `FINAL_STAGE`
 */
const buttonSeries = []; // TODO: function to fill array with random ButtonPress values

/**
 * # Index of `buttonSeries` that player needs to press now
 * @type {number} Initial value should be `1`
 */
const toTest = 1;

/**
 * # Is game in strict mode
 * @type {Boolean}
 */
const isStrict = false;

export default {
  currentStage,
  buttonSeries,
  toTest,
  isStrict,
};
