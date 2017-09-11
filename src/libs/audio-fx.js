export default (function AudioFX() {
  //---------------------------------------------------------------------------

  const VERSION = '0.4.0';

  //---------------------------------------------------------------------------

  let hasAudio = false,
    audio = document.createElement('audio'),
    audioSupported = function(type) {
      const s = audio.canPlayType(type);
      return s === 'probably' || s === 'maybe';
    };
  if (audio && audio.canPlayType) {
    hasAudio = {
      ogg: audioSupported('audio/ogg; codecs="vorbis"'),
      mp3: audioSupported('audio/mpeg;'),
      m4a: audioSupported('audio/x-m4a;') || audioSupported('audio/aac;'),
      wav: audioSupported('audio/wav; codecs="1"'),
      loop: typeof audio.loop === 'boolean', // some browsers (FF) dont support loop yet
    };
  }

  //---------------------------------------------------------------------------

  const create = function(src, options, onload) {
    const audio = document.createElement('audio');

    if (onload) {
      var ready = function() {
        audio.removeEventListener('canplay', ready, false);
        onload();
      };
      audio.addEventListener('canplay', ready, false);
    }

    if (options.loop && !hasAudio.loop)
      audio.addEventListener(
        'ended',
        () => {
          audio.currentTime = 0;
          audio.play();
        },
        false,
      );

    audio.volume = options.volume || 0.1;
    audio.autoplay = options.autoplay;
    audio.loop = options.loop;
    audio.src = src;

    return audio;
  };

  //---------------------------------------------------------------------------

  const choose = function(formats) {
    for (let n = 0; n < formats.length; n++)
      if (hasAudio && hasAudio[formats[n]]) return formats[n];
  };

  //---------------------------------------------------------------------------

  const find = function(audios) {
    let n, audio;
    for (n = 0; n < audios.length; n++) {
      audio = audios[n];
      if (audio.paused || audio.ended) return audio;
    }
  };

  //---------------------------------------------------------------------------

  const afx = function(src, options, onload) {
    options = options || {};

    let formats = options.formats || [],
      format = choose(formats),
      pool = [];

    src += (format ? `.${  format}` : '');

    if (hasAudio) {
      for (let n = 0; n < (options.pool || 1); n++)
        pool.push(create(src, options, n == 0 ? onload : null));
    } else {
      onload();
    }

    return {
      audio: pool.length == 1 ? pool[0] : pool,

      play() {
        const audio = find(pool);
        if (audio) audio.play();
      },

      stop() {
        let n, audio;
        for (n = 0; n < pool.length; n++) {
          audio = pool[n];
          audio.pause();
          audio.currentTime = 0;
        }
      },
    };
  };

  //---------------------------------------------------------------------------

  afx.version = VERSION;
  afx.supported = hasAudio;

  return afx;

  //---------------------------------------------------------------------------
})();
