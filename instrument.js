import assign    from 'object.assign'
import Wad       from './bower_components/Wad/src/wad'
import synthIcon from './icons/synth1.svg' 
import bassIcon  from './icons/bass1.svg' 
import ghostIcon from './icons/ghost.svg' 
import hatIcon   from './icons/hihat.svg' 
import kickIcon  from './icons/kick.svg' 

/** Instruments **/

let hat = assign({}, Wad.presets.hiHatClosed, { type : 'hat' })
hat.globalReverb = true;

let hato = assign({}, Wad.presets.hiHatOpen, { type : 'hato' })
hato.globalReverb = true;

let kick = assign({}, Wad.presets.snare, { type : 'kick' })
kick.globalReverb = true;

let ghost = assign({}, Wad.presets.ghost, { type : 'ghost' })

let snare = {
    type : 'snare',
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
    type: 'synth',
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
    type : 'bass',
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
let instrumentIcons = {
    'hat'   : hatIcon,
    'synth' : synthIcon,
    'ghost' : ghostIcon,
    'bass'  : bassIcon 
}

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

let ins

/** EXPORTS **/

export { random, bass, hat, hato, kick, synth, snare, instrumentIcons }
