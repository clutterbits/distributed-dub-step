import Firebase from 'firebase/lib/firebase-web'
import { random } from './instrument'

let firebase = new Firebase('https://distributed-dub-step.firebaseio.com/instruments')
let instrument = random()
let _instrument = firebase.push(instrument)
_instrument.onDisconnect().remove()
