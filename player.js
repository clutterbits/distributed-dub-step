import React       from 'react'
import ReactDOM    from 'react-dom'
import Firebase    from 'firebase/lib/firebase-web'
import Shake       from 'shake.js'
import { random }  from './instrument'
import playerStyle from './player.styl'

let firebase = new Firebase('https://distributed-dub-step.firebaseio.com/instruments')
let instrument = random()
let _instrument = firebase.push(instrument)
_instrument.onDisconnect().remove()

let myshake = new Shake({
    threshold: 10, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
})
myshake.start()

class DistributedDubStepPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            x : 0,
            y : 0,
            z : 0
        }
    }
    render() {
        let largestDelta = this.state.x
        if (this.state.y > largestDelta) largestDelta = this.state.y
        if (this.state.z > largestDelta) largestDelta = this.state.z
        return (
            <div className="DistributedDubStepPlayer">
                <style>{playerStyle}</style>
                <div className="shakeDelta">
                    <div>{largestDelta}</div>
                </div>
            </div>
        )
    }
    shakeHandler(e) {
        this.setState({
            x : e.deltaX,
            y : e.deltaY,
            z : e.deltaZ
        })
        clearTimeout(this.shakeTimeout)
        this.shakeTimeout = setTimeout(() => {
            this.setState({
                x : 0,
                y : 0,
                z : 0
            })
        },2000) 
    }
    componentDidMount() {
        window.addEventListener('shake', this.shakeHandler.bind(this), false)
    }
}

let container = document.createElement('div')
document.body.appendChild(container)

ReactDOM.render(<DistributedDubStepPlayer />, container)

