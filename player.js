import React       from 'react'
import ReactDOM    from 'react-dom'
import Firebase    from 'firebase/lib/firebase-web'
import Shake       from 'shake.js'
import Svg         from '@asbjornenge/react-svg'
import { random }  from './instrument'
import { instrumentIcons }  from './instrument'
import playerStyle from './player.styl'
import babysad     from './icons/babysad.svg'
import babysmile   from './icons/babysmile.svg'
import babyhappy   from './icons/babyhappy.svg'
import babylove    from './icons/babylove.svg'
import trooper     from './icons/trooper.svg'

let firebase = new Firebase('https://distributed-dub-step.firebaseio.com/instruments')
let instrument = random()
let _instrument = firebase.push(instrument)
_instrument.onDisconnect().remove()

console.log(instrument.type)

let myshake = new Shake({
    threshold: 10, // optional shake strength threshold
    timeout: 100 // optional, determines the frequency of event generation
})
myshake.start()

class DistributedDubStepPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shakeValue : 0
        }
    }
    render() {
        let largestDelta = this.state.shakeValue
        let baby = babysad
        if (largestDelta > 10) baby = babysmile
        if (largestDelta > 30) baby = babyhappy
        if (largestDelta > 50) baby = babylove
        return (
            <div className="DistributedDubStepPlayer">
                <style>{playerStyle}</style>
                <div className="mask">
                    <Svg className="baby" svg={baby} />
                </div>
                <div className={"instrument "+instrument.type}>
                    <Svg svg={instrumentIcons[instrument.type]} />
                </div>
            </div>
        )
    }
    shakeHandler(e) {
        this.shakeDeltas.push({
            x : e.deltaX,
            y : e.deltaY,
            z : e.deltaZ
        })
        clearTimeout(this.shakeTimeout)
        this.shakeTimeout = setTimeout(() => {
            this.shakeDeltas = []
        },2000) 
    }
    setShakeValues() {
        let shakeValue = this.shakeDeltas.reduce((max, deltas) => {
            let _max = deltas.x
            if (deltas.y > _max) _max = deltas.y
            if (deltas.z > _max) _max = deltas.z
            if (_max > max) return _max
            return max
        },0)
        this.shakeDeltas = []
        this.setState({ shakeValue : shakeValue }) 
    }
    componentDidMount() {
        this.shakeDeltas = []
        setInterval(this.setShakeValues.bind(this), 2000)
        window.addEventListener('shake', this.shakeHandler.bind(this), false)
    }
}

let container = document.createElement('div')
document.body.appendChild(container)

ReactDOM.render(<DistributedDubStepPlayer />, container)

