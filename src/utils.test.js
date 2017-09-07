import { getTimeouts } from './utils';

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
