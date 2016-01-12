import Wad from './bower_components/Wad/src/wad'

/** Instruments **/

let hat = Wad.presets.hiHatClosed
hat.globalReverb = true;

let hato = Wad.presets.hiHatOpen
hato.globalReverb = true;

let kick = Wad.presets.snare
kick.globalReverb = true;

let ghost = Wad.presets.ghost

let snare = {
    source: 'noise',
    volume: 0.1,
    panning : 0,
    env: {
        attack: 0.01,
        hold: 0.35,
        filter: {
            type: 'lowpass',
            frequency: 150,
            q: 0.115
        }
    }
}
snare.globalReverb = true;

let synth = {
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
}

let bass = {
    source : 'sine',
    pitch : 'C2',
    env : {
        attack : .02,
        decay : .1,
        sustain : .9,
        hold : .4,
        release : .1
    }
}

/** VARIABLES **/

let instruments = [hat, synth, synth, ghost, bass]

/** FUNCTIONS **/

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

/** EXPORTS **/

export { random, bass, hat, hato, kick, synth, snare }
