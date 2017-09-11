import { getTimeouts, getButtonSeries, setStrict } from './utils';

describe('getTimeouts', () => {
  test('produces correct array when n is 5', () => {
    const received = getTimeouts(5, [1000, 750, 500, 250]);
    const expected = [1000, 750, 500, 250, 250];
    expect(received).toEqual(expected);
  });

  test('produces correct array when n is 10', () => {
    const received = getTimeouts(10, [1000, 750, 500, 250]);
    const expected = [1000, 1000, 750, 750, 500, 500, 250, 250, 250, 250];
    expect(received).toEqual(expected);
  });

  test('produces correct array with different tm', () => {
    const received = getTimeouts(5, [1, 2, 3, 4]);
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
      .mockReturnValueOnce(0.24);
    global.Math.random = mockRandom;
    const received = getButtonSeries(5, ['a', 'b', 'c', 'd']);
    const expected = ['a', 'b', 'c', 'd', 'a'];
    expect(received).toEqual(expected);
  });
});

describe('setStrict', () => {
  test('Does not mutate state', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: false,
    };
    const expected = state;
    setStrict(state, true);
    const received = state;
    expect(received).toEqual(expected);
  });

  test('Switches from false to true', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: false,
    };
    const received = setStrict(state, true);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: true,
    };
    expect(received).toEqual(expected);
  });

  test('Switches from true to false', () => {
    const state = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: true,
    };
    const received = setStrict(state, false);
    const expected = {
      currentStage: 1,
      buttonSeries: ['blue', 'green', 'red', 'yellow'],
      toTest: 1,
      isStrict: false,
    };
    expect(received).toEqual(expected);
  });
});
