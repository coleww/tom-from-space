var adsr = require('a-d-s-r')
var makeDistortionCurve = require('make-distortion-curve')
// On the kick drum play around with the waveform and decay speed to make cheesy sounding synth tom drums.
// To make gabber kick drums, slow the decay and set it to a sawtooth and add some valve distortion.
// Set the modulation decay on the snare drum to full to make 808 tom sounds like mount kimbie.
// Play around with different noise types on the hi-hats to get different textures.
// For Trap Hi hats, clone Oscillator 2 into Oscillator 3 and hard pan Oscillators 2 and 3 left and right. de-tune one of them. You can do the same with the Snare.
module.exports = function (ac, opts) {
  var audioNodes = {
    osc: ac.createOscillator(),
    gain: ac.createGain(),
    dist: ac.createWaveShaper(),
    filter: ac.createBiquadFilter(),
    settings: {
      freq: 150,
      endFreq: 75,
      attack: 0.1,
      decay: 0.1,
      sustain: 0.012,
      release: 0.013,
      peak: 0.5,
      mid: 0.35,
      end: 0.000000000000000000001
    }
  }
  audioNodes.osc.type = 'sawtooth'
  audioNodes.osc.frequency.setValueAtTime(0.00000001, ac.currentTime)
  audioNodes.osc.start(ac.currentTime)

  audioNodes.gain.gain.setValueAtTime(0.00000001, ac.currentTime)

  audioNodes.dist.curve = makeDistortionCurve(1000)

  audioNodes.filter.type = 'lowpass'
  audioNodes.filter.frequency.setValueAtTime(audioNodes.settings.freq * 3.5, ac.currentTime)

  audioNodes.osc.connect(audioNodes.gain)
  audioNodes.gain.connect(audioNodes.dist)
  audioNodes.dist.connect(audioNodes.filter)

  return {
    connect: function (input) {
      audioNodes.filter.connect(input)
    },
    start: function (when) {
      audioNodes.osc.frequency.setValueAtTime(audioNodes.settings.freq, when)
      audioNodes.osc.frequency.exponentialRampToValueAtTime(audioNodes.settings.endFreq, when + audioNodes.settings.attack + audioNodes.settings.decay + audioNodes.settings.sustain + audioNodes.settings.release)
      adsr(audioNodes.gain, when, audioNodes.settings)
    },
    stop: function (when) {
      audioNodes.source.stop(when)
    },
    update: function (opts) {
      Object.keys(opts).forEach(function (k) {
        audioNodes.settings[k] = opts[k]
      })
    },
    nodes: function () {
      return audioNodes
    }
  }
}