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
export const getTimeouts = (n, tv) =>
  [...Array(n)].map((_, i) => {
    switch (true) {
      case i < n / 5:
        return tv[0];
      case i < n * (2 / 5):
        return tv[1];
      case i < n * (3 / 5):
        return tv[2];
      default:
        return tv[3];
    }
  });

/**
 * # Gets button series for the game
 * @param  {number} n               Length of returned array
 * @param  {Array.<string>} buttons Names of buttons
 * @return {Array.<string>}         Names of buttons in randomized series
 */
export const getButtonSeries = (n, buttons) =>
  [...Array(n)].map(() => buttons[Math.floor(Math.random() / (1 / buttons.length))]);
