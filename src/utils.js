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
 * @param  {Array.<number>} dv Duration values
 * @return {Array.<number>}   Array where _index_ is **stage number** and
 *                                        _value_ is **duration** in milliseconds
 *                                  * 1st fifth of stages have timeout of dv[0]
 *                                  * 2nd fifth of stages have timeout of dv[1]
 *                                  * 3rd fifth of stages have timeout of dv[2]
 *                                  * rest of stages have timeout of dv[3]
 */
export const getDurations = (n, dv) => newMappedArray(n, getTimeout(n, dv));

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

/**
 * # Format stage number, add 0 in front if less than 10
 * @param  {number} n
 * @return {string}
 * @example `formatStageNum(9) === '09'`
 */
export const formatStageNum = n => (n < 10 ? '0' : '') + n.toString();

/**
 * # Set state.isCorrect to true if correct button pushed
 * @param  {string} id    ID of pushed button
 * @param  {object} state
 * @return {object}
 */
export const testButtonPress = (id, oldState) =>
  getNewState(oldState, {
    isCorrect: id.slice(4) === oldState.buttonSeries[oldState.toTest],
  });

/**
 * # Return new state for correct button pressed
 * @param  {object} oldState
 * @return {object}
 */
export const advanceState = oldState =>
  getNewState(
    oldState,
    oldState.toTest + 1 === oldState.currentStage
      ? {
          currentStage: oldState.currentStage + 1,
          toTest: 0,
        }
      : { toTest: oldState.toTest + 1 },
  );

/**
 * # Return new state for wrong button pressed
 * @param  {object} oldState
 * @return {object}
 */
export const wrongState = oldState => getNewState(oldState, { toTest: 0 });
