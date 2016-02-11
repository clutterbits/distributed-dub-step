import React             from 'react'
import ReactDOM          from 'react-dom'
import Firebase          from 'firebase/lib/firebase-web'
import _                 from 'underscore'
import receiverStyle     from './receiver.styl'
import Wad               from './bower_components/Wad/src/wad'
import { random, snare } from './instrument'

let firebase = new Firebase('https://distributed-dub-step.firebaseio.com/instruments')

let bpm     = 100
let seconds = 60
let beat    = seconds/bpm
let pattern = 8
let allowedBeatSegments = [1,2.25,2.5,2.75,3.5,5,6.95]
let takenSegments = []
let beatBase = new Wad(snare)
//beatBase.setVolume(0.1)
let pickRandomBeatSegmentWithSkew = () => {
    let skew = parseFloat(Math.random().toFixed(2))/10
    return allowedBeatSegments[Math.floor(Math.random()*allowedBeatSegments.length)]+skew
}
let pickRandomBeatSegment = () => {
    return allowedBeatSegments[Math.floor(Math.random()*allowedBeatSegments.length)]
}
let playRandomInstrument = (inst) => {
    if (!inst.wad) return
    let segment = pickRandomBeatSegment()
    if (takenSegments.indexOf(segment) >= 0) return
    takenSegments.push(segment)
    if (inst.type == 'synth') {
        return inst.wad.play({
            wait: beat * segment,
            pitch: ['C5','C7'][Math.floor(Math.random()*2)]
        })
    }
    inst.wad.play({
        wait: beat * segment
    })
}

Wad.setGlobalReverb({impulse : 'widehall.wav', wet : .5})

class DistributedDubStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mute : false,
            allowRemote : true,
            randomInstruments : [],
            remoteInstruments : []
        }
    }
    render() {
        return (
            <div className="DistributedDubStep">
                <style>{receiverStyle}</style>
                <div className="controls">
                    <div className="numRandom">
                        <button onClick={this.toggleMute.bind(this)}>
                            { this.state.mute ? 'UnMute' : 'Mute'}
                        </button>
                    </div>
                    <div className="numRandom">
                        Number of random: {this.state.randomInstruments.length}
                        <button onClick={this.addRandom.bind(this)}>+</button>
                        <button onClick={this.delRandom.bind(this)}>-</button>
                    </div>
                    <div className="numRemote">
                        Number of remote: {this.state.remoteInstruments.length}
                    </div>
                    <div className="allowRemote">
                        Allow remote instruments: {this.state.allowRemote ? 'Yes' : 'Nope'}
                        <button onClick={this.toggleRemote.bind(this)}>Toggle</button>
                    </div>
                </div>
            </div>
        )
    }
    toggleRemote() {
        this.setState({ allowRemote : !this.state.allowRemote })
    }
    toggleMute() {
        this.setState({ mute : !this.state.mute })
    }
    addRandom() {
        let rand = random(1)
        let randomInstrument = {
            type : rand[0].type, 
            wad  : new Wad(rand[0])
        }
        this.state.randomInstruments.push(randomInstrument)
        this.forceUpdate() 
    }
    delRandom() {
        this.state.randomInstruments.pop()
        this.forceUpdate()
    }
    addRemote(id, inst) {
        let remoteInstrument = {
            id   : id,
            type : inst.type,
            wad  : new Wad(inst)
        }
        remoteInstrument.wad.setVolume(0)
        this.state.remoteInstruments.push(remoteInstrument)
        this.forceUpdate() 
    }
    delRemote(id) {
        this.state.remoteInstruments = this.state.remoteInstruments.filter(inst => {
            return inst.id != id
        })
        this.forceUpdate()
    }
    updateRemote(id, update) {
        this.state.remoteInstruments.forEach(inst => {
            if (inst.id == id) {
                inst.wad.setVolume(parseFloat(update.volume.toFixed(2)))
            }
        })
    }
    loop() {
        if (this.state.mute) return
        takenSegments = []
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
        if (!this.state.allowRemote) {
            this.state.randomInstruments
                .forEach(inst => {
                    playRandomInstrument(inst)
                })
        } else {
            this.state.randomInstruments.concat(this.state.remoteInstruments)
                .forEach(inst => {
                    playRandomInstrument(inst)
                })

        } 
    }
    componentDidMount() {
        firebase.on('child_added', (snap) => {
            this.addRemote(snap.key(), snap.val())
        })
        firebase.on('child_removed', (snap) => {
            this.delRemote(snap.key())
        })
        firebase.on('child_changed', (snap) => {
            this.updateRemote(snap.key(), snap.val())
        })
        this.loop()
        setInterval(this.loop.bind(this), Math.floor(beat * pattern * 1000))
    }
}

let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<DistributedDubStep />, container)

