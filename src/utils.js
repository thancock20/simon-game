const newMappedArray = (n, fn) => [...Array(n)].map(fn);

const getNewState = (oldState, stateDelta) =>
  Object.assign({}, oldState, stateDelta);

const getTimeout = (n, tv) => (_, i) =>
  i < n * (1 / 5)
    ? tv[0]
    : i < n * (2 / 5) ? tv[1] : i < n * (3 / 5) ? tv[2] : tv[3];

const getRandomButton = buttons => () =>
  buttons[Math.floor(Math.random() / (1 / buttons.length))];

const isWithin = limit => (_, i) => i < limit;

/**
 * # Produce timeouts for the stages
 * @param  {number} n Total number of stages
 * @param  {Array.<number>} tv Timeout values
 * @return {Array.<number>}   Array where _index_ is **stage number** and
 *                                        _value_ is **timeout** in milliseconds
 *                                  * 1st fifth of stages have timeout of tv[0]
 *                                  * 2nd fifth of stages have timeout of tv[1]
 *                                  * 3rd fifth of stages have timeout of tv[2]
 *                                  * rest of stages have timeout of tv[3]
 */
export const getTimeouts = (n, tv) => newMappedArray(n, getTimeout(n, tv));

/**
 * # Gets button series for the game
 * @param  {number} n               Length of returned array
 * @param  {Array.<string>} buttons Names of buttons
 * @return {Array.<string>}         Names of buttons in randomized series
 */
export const getButtonSeries = (n, buttons) =>
  newMappedArray(n, getRandomButton(buttons));

/**
 * # Sets isStrict
 * @param {Object}  oldState
 * @param {Boolean} isStrict
 * @return {Object} new State object with isStrict set
 */
export const setStrict = (oldState, isStrict) =>
  getNewState(oldState, { isStrict });

/**
 * # Get the buttons within the current stage
 * @param  {Object} state
 * @return {Array.<ButtonPress>}  Buttons within the current stage
 */
export const getButtonsWithinCurrent = state =>
  state.buttonSeries.filter(isWithin(state.currentStage));

/**
 * # Iterates over obj values with fn (used for side effects)
 * @param  {Object}   obj
 * @param  {Function} fn
 */
export const iterObj = (obj, fn) => Object.values(obj).forEach(fn);
