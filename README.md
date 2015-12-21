# tom-from-space

a rly weird tom tom. play around with different low-end freq/endFreq settings to get gnarly space tommys

# USE IT

```
var tom = require('tom-from-space')(yrAudioContext)
tom.start(yrAudioContext.currentTime)
tom.update({freq: 420, endFreq: 666}) // pew pew
tom.start(yrAudioContext.currentTime)
```

# SETTINGS:
other things that can be controlled through the update method:

```
    settings: {

      freq: 250, // peak osc freq
      endFreq: 0.000000000000000000001, // the end freq. idk why web audio hates 0.0 :/
      
      // SETTINGS for a-d-s-r module:
      attack: 0.000000000000000000001,
      decay: 0.000000000000000000001,
      sustain: 0.12,
      release: 0.13,
      peak: 0.5,
      mid: 0.35,
      end: 0.000000000000000000001
    }
```

For everything else, just call `nodes()` on yr synth object to do more close to the metal manipulations


# DEVELOPMENT

```
git clone ...
cd web-audio-synth-template
npm install
npm run test # should pass! Yay!
```

# HEAR THE MAGIC!

- `npm run serve` boot a webserver at port 3000
- `npm run build` build demo.js to a bundle. Run this after making any changes to hear updates (or add [watchify](https://github.com/wham-js/web-audio-advent-calendar/blob/master/package.json#L8), i wanted to keep things "light")
- open `http://localhost:3000/` in a web browser and hear the magic (hopefully)

# RESOURCES


- [openmusic](https://github.com/openmusic) has a ton of helpful modules
- if you need a basic convolver impulse, [voila](https://github.com/mdn/voice-change-o-matic/tree/gh-pages/audio)