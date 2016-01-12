import Wad from './bower_components/Wad/src/wad'

var hat = new Wad(Wad.presets.hiHatClosed);
hat.globalReverb = true;

var hato = new Wad(Wad.presets.hiHatOpen);
hato.globalReverb = true;

var kick = new Wad(Wad.presets.snare);
kick.globalReverb = true;

var ghost = new Wad(Wad.presets.ghost)

var synth = new Wad({
    source: 'square',
    volume: 0.5,
    env: {
        attack: 0.01,
        decay: 0.05,
        sustain: 0.22,
        hold: 0.015,
        release: 0.5
    },
    filter: {
        type: 'lowpass',
        frequency: 1200,
        q: 8.5,
        env: {
            attack: 0.2,
            frequency: 600
        }
    }
});

let bass = new Wad({
    source : 'sine',
    pitch : 'C2',
    env : {
        attack : .02,
        decay : .1,
        sustain : .9,
        hold : .4,
        release : .1
    }
})

let instruments = [hat, synth, synth, ghost, bass]

let randomInstrument = () => {
    return instruments[Math.floor(Math.random()*instruments.length)]
}

let random = (i) => {
    if (!i) return randomInstrument()
    let num = i
    let list = []
    while(num > 0) {
        list.push(randomInstrument())
        num--
    }
    return list
}

export { random, bass, hat, hato, kick, synth }
