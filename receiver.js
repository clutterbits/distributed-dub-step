import Firebase from 'firebase/lib/firebase-web'
import Wad from './bower_components/Wad/src/wad'
import { random, snare } from './instrument'

let firebase = new Firebase('https://distributed-dub-step.firebaseio.com/instruments')

let bpm     = 100
let seconds = 60
let beat    = seconds/bpm
let pattern = 8
let allowedBeatSegments = [1,2.25,2.5,2.75,3.5,5,6.95]
let remoteIntruments = {}

firebase.on('child_added', (snap) => {
    remoteIntruments[snap.key()] = {
        wad : new Wad(snap.val())
    }
})
firebase.on('child_removed', (snap) => {
    delete remoteIntruments[snap.key()]
})
firebase.on('child_changed', (snap) => {
    console.log('changed', snap.val())
})


let randomInstruments = []//random(30).map(i => {
//    return new Wad(i)
//})
let beatBase = new Wad(snare)

let pickRandomBeatSegment = () => {
    let skew = parseFloat(Math.random().toFixed(2))/10
    return allowedBeatSegments[Math.floor(Math.random()*allowedBeatSegments.length)]+skew
}

let playRandomInstrument = (inst) => {
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
    Object.keys(remoteIntruments).forEach(id => {
        let inst = remoteIntruments[id].wad
        playRandomInstrument(inst)
    })
    randomInstruments.forEach((inst, index) => {
        playRandomInstrument(inst)
    })
}

loop()
//setInterval(loop, Math.floor(beat * pattern * 1000))
