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
 * # Timeouts for stages
 * @readonly
 * @param  {Number} n Always {@link FINAL_STAGE} - if changing, do so above
 * @return {Number[]}   Array where _index_ is **stage number** and
 *                                  _value_ is **timeout** in milliseconds
 *                            * 1st fifth of stages have timeout of 1000
 *                            * 2nd fifth of stages have timeout of 750
 *                            * 3rd fifth of stages have timeout of 500
 *                            * rest of stages have timeout of 250
 */
export const TIMEOUTS = (n =>
  [...Array(n)].map((_, i) => {
    switch (true) {
      case i < n / 5:
        return 1000;
      case i < n * (2 / 5):
        return 750;
      case i < n * (3 / 5):
        return 500;
      default:
        return 250;
    }
  }))(FINAL_STAGE);

/**
 * # Paths to sounds used for gameplay
 * @readonly
 * @enum {string}
 */
export const SOUNDS = {
  blue: './sounds/blue.mp3',
  green: './sounds/green.mp3',
  red: './sounds/red.mp3',
  yellow: './sounds/yellow.mp3',
  wrong: './sounds/wrong.mp3',
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
