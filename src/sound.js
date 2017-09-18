import { SOUNDS } from './constants';

const context = new (window.AudioContext || window.webkitAudioContext)();

export default sound => {
  // sounds[sound].play();
  const osc = context.createOscillator();
  osc.frequency.value = SOUNDS[sound];
  osc.type = 'square';
  osc.connect(context.destination);
  osc.start(0);

  const stop = () => {
    osc.stop();
  };
  return { stop };
};
