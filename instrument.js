import assign    from 'object.assign'
import Wad       from './bower_components/Wad/src/wad'
import synthIcon from './icons/synth1.svg' 
import bassIcon  from './icons/bass1.svg' 
import ghostIcon from './icons/ghost.svg' 
import hatIcon   from './icons/hihat.svg' 
import kickIcon  from './icons/kick.svg' 

/** Instruments **/

let kick  = assign({ source: 'kick.wav',  type : 'kick',  probability : 100 })
let snare = assign({ source: 'snare.wav', type : 'snare', probability : 20 })
let clap  = assign({ source: 'clap.wav',  type : 'clap',  probability : 50 })
let ghost = assign({ source: 'ghost.wav', type : 'ghost', probability : 5 })
let flash = assign({ source: 'flash.wav', type : 'flash', probability : 5 })
let stomp = assign({ source: 'stomp.wav', type : 'stomp', probability : 50 })
let woosh = assign({ source: 'woosh.wav', type : 'woosh', probability : 30 })
let write = assign({ source: 'twrit.wav', type : 'write', probability : 50 })
//snare.globalReverb = true;

let synth = {
    type: 'synth',
    probability : 50,
    pitch: 'C5',
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
synth.globalReverb = true

/** VARIABLES **/

let instruments = [synth, kick, clap, woosh, flash, stomp, write]
let instrumentSpread = []
instruments.forEach(i => {
    let j = i.probability
    while(j>0) {
        instrumentSpread.push(i)
        j--
    }
})
let instrumentIcons = {
    'hat'   : hatIcon,
    'synth' : synthIcon,
    'ghost' : ghostIcon,
    'bass'  : bassIcon 
}

/** FUNCTIONS **/

let randomInstrument = () => {
    return instrumentSpread[Math.floor(Math.random()*instrumentSpread.length)]
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

export { random, snare, instrumentIcons }
