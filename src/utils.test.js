import {
  getDurations,
  getButtonSeries,
  setStrict,
  getButtonsWithinCurrent,
  iterObj,
  formatStageNum,
  testButtonPress,
  advanceState,
  wrongState,
} from './utils';

describe('getDurations', () => {
  test('produces correct array when n is 5', () => {
    const received = getDurations(5, [1000, 750, 500, 250]);
    const expected = [1000, 750, 500, 250, 250];
    expect(received).toEqual(expected);
  });

  test('produces correct array when n is 10', () => {
    const received = getDurations(10, [1000, 750, 500, 250]);
    const expected = [1000, 1000, 750, 750, 500, 500, 250, 250, 250, 250];
    expect(received).toEqual(expected);
  });

  test('produces correct array with different tv', () => {
    const received = getDurations(5, [1, 2, 3, 4]);
    const expected = [1, 2, 3, 4, 4];
    expect(received).toEqual(expected);
  });
});

describe('getButtonSeries', () => {
  test('When random are all the same', () => {
    const mockRandom = jest.fn();
    mockRandom.mockReturnValue(0.5);
    global.Math.random = mockRandom;
    const received = getButtonSeries(5, ['a', 'b', 'c', 'd']);
    const expected = ['c', 'c', 'c', 'c', 'c'];
    expect(received).toEqual(expected);
  });

  test('When random are all different', () => {
    const mockRandom = jest.fn();
    mockRandom
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.25)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.75)
      .mockReturnValueOnce(0.24)
      .mockReturnValueOnce(0.49)
      .mockReturnValueOnce(0.74)
      .mockReturnValueOnce(0.99);
    global.Math.random = mockRandom;
    const received = getButtonSeries(8, ['a', 'b', 'c', 'd']);
    const expected = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'];
    expect(received).toEqual(expected);
  });
});

describe('setStrict', () => {
  test('Does not mutate state', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const expected = Object.assign({}, state);
    setStrict(state, true);
    const received = state;
    expect(received).toEqual(expected);
  });

  test('Switches from false to true', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const received = setStrict(state, true);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: true,
      isCorrect: true,
    };
    expect(received).toEqual(expected);
  });

  test('Switches from true to false', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: true,
      isCorrect: true,
    };
    const received = setStrict(state, false);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    expect(received).toEqual(expected);
  });
});

describe('getButtonsWithinCurrent', () => {
  test('Does not mutate state', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    const expected = Object.assign({}, state);
    getButtonsWithinCurrent(state);
    const received = state;
    expect(received).toEqual(expected);
  });

  test('Gets only first button if currentStage is 1', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const received = getButtonsWithinCurrent(state);
    const expected = ['blue'];
    expect(received).toEqual(expected);
  });

  test('Gets two buttons if currentStage is 2', () => {
    const state = {
      currentStage: 2,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const received = getButtonsWithinCurrent(state);
    const expected = ['blue', 'green'];
    expect(received).toEqual(expected);
  });

  test('Gets all buttons if currentStage is same as length', () => {
    const state = {
      currentStage: 4,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const received = getButtonsWithinCurrent(state);
    const expected = state.buttonSeries;
    expect(received).toEqual(expected);
  });
});

describe('iterObj', () => {
  test('Does not mutate obj', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const expected = Object.assign({}, obj);
    const fn = el => el * 2;
    iterObj(obj, fn);
    const received = obj;
    expect(received).toEqual(expected);
  });

  test('Pushes values to an array', () => {
    const obj = {
      a: 'a',
      b: 'b',
      c: 'c',
    };
    const received = [];
    const fn = el => received.push(el);
    iterObj(obj, fn);
    const expected = ['a', 'b', 'c'];
    expect(received).toEqual(expected);
  });

  test('Pushes double of values to an array', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3,
    };
    const received = [];
    const fn = el => received.push(el * 2);
    iterObj(obj, fn);
    const expected = [2, 4, 6];
    expect(received).toEqual(expected);
  });
});

describe('formatStageNum', () => {
  test('Adds 0 in front of 9', () => {
    const received = formatStageNum(9);
    const expected = '09';
    expect(received).toEqual(expected);
  });

  test('Does not add 0 in front of 10', () => {
    const received = formatStageNum(10);
    const expected = '10';
    expect(received).toEqual(expected);
  });
});

describe('testButtonPress', () => {
  test('Does not mutate state', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    const expected = Object.assign({}, state);
    testButtonPress('btn-blue', state);
    const received = state;
    expect(received).toEqual(expected);
  });

  test('Changes to true if correct button pressed', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    const received = testButtonPress('btn-blue', state);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    expect(received).toEqual(expected);
  });

  test('Changes to false if incorrect button pressed', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const received = testButtonPress('btn-red', state);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    expect(received).toEqual(expected);
  });

  test('Stays true if correct button pressed', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const received = testButtonPress('btn-blue', state);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    expect(received).toEqual(expected);
  });

  test('Stays false if incorrect button pressed', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    const received = testButtonPress('btn-red', state);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    expect(received).toEqual(expected);
  });
});

describe('advanceState', () => {
  test('Does not mutate state', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const expected = Object.assign({}, state);
    advanceState(state);
    const received = state;
    expect(received).toEqual(expected);
  });

  test('Adds one to toTest if series not complete', () => {
    const state = {
      currentStage: 2,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    const received = advanceState(state);
    const expected = {
      currentStage: 2,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: false,
      isCorrect: true,
    };
    expect(received).toEqual(expected);
  });

  test('Adds one to currentStage and sets toTest to zero if complete', () => {
    const state = {
      currentStage: 2,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: false,
      isCorrect: true,
    };
    const received = advanceState(state);
    const expected = {
      currentStage: 3,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: true,
    };
    expect(received).toEqual(expected);
  });
});

describe('wrongState', () => {
  test('Does not mutate state', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    const expected = Object.assign({}, state);
    wrongState(state);
    const received = state;
    expect(received).toEqual(expected);
  });

  test('Keeps toTest at zero', () => {
    const state = {
      currentStage: 2,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    const received = wrongState(state);
    const expected = state;
    expect(received).toEqual(expected);
  });

  test('Resets toTest to zero', () => {
    const state = {
      currentStage: 2,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: false,
      isCorrect: false,
    };
    const received = wrongState(state);
    const expected = {
      currentStage: 2,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 0,
      isStrict: false,
      isCorrect: false,
    };
    expect(received).toEqual(expected);
  });
});
