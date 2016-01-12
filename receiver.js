import Wad from './bower_components/Wad/src/wad'
import { random } from './instrument'

let bpm     = 100
let seconds = 60
let beat    = seconds/bpm
let pattern = 8

var snare = new Wad({
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
});
snare.globalReverb = true;

var snare2 = new Wad ({
    source : 'noise', 
    volume : 0.8,
    env : {
        attack : .001, 
        decay : .01, 
        sustain : .2, 
        hold : .05, 
        release : .02
    }, 
    filter : {
        type : 'bandpass', 
        frequency : 300, 
        q : .180
    }
})

import { bass } from './instrument'

let allowedBeatSegments = [1,2.25,2.5,2.75,3.5,5,6.95]
let randomInstruments = random(30)
let beatBase = snare

let pickRandomBeatSegment = () => {
    let skew = parseFloat(Math.random().toFixed(2))/10
    return allowedBeatSegments[Math.floor(Math.random()*allowedBeatSegments.length)]+skew
}

Wad.setGlobalReverb({impulse : '/widehall.wav', wet : .5})

let loop = () => {
    // Base beat
    beatBase.play({
        wait: beat * 0
    })
    beatBase.play({
        wait: beat * 2
    })
    beatBase.play({
        wait: beat * 4
    })
    beatBase.play({
        wait: beat * 6
    })
    // Randomize
    randomInstruments.forEach((inst, index) => {
        if (inst.source == 'square')
            inst.play({
                volume : 0.1,
                wait: beat * pickRandomBeatSegment(), 
//                wait: beat * Math.random() * pattern,
                pitch : ['C5','C7'][Math.floor(Math.random()*2)]
            })
        else
            inst.play({
                wait: beat * pickRandomBeatSegment() 
            })
    })
}

loop()
setInterval(loop, Math.floor(beat * pattern * 1000))
