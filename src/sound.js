import AudioFX from './libs/audio-fx';

import { SOUNDS } from './constants';

const sounds = {};
Object.entries(SOUNDS).forEach(sound => {
  sounds[sound[0]] = AudioFX(sound[1], { pool: 4, volume: 1 });
});

export default sound => {
  sounds[sound].play();
};
