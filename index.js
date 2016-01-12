import Wad from './bower_components/Wad/src/wad'

var bpm = 100;
var seconds =  60;
var beat = seconds/bpm;
var pattern = 8;

var hat = new Wad(Wad.presets.hiHatClosed);
hat.globalReverb = true;

var hato = new Wad(Wad.presets.hiHatOpen);
hato.globalReverb = true;

var kick = new Wad(Wad.presets.snare);
kick.globalReverb = true;

var snare = new Wad({
    source: 'noise',
    volume: 0.6,
    panning : 0.1,
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

var synth = new Wad({
    source: 'square',
    volume: 0.375,
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

var loop = function () {

    /***
     * Hats
     */

    // step 1
    hat.play({
        wait: beat * 0,
        filter: [{
            type : 'highpass',
            frequency: 5000,
            q : 5
        }]
    });

    hat.play({
        wait: beat * 0.25,
        filter: [{
            type : 'highpass',
            frequency: 8000,
            q : 5
        }]
    });

    hat.play({
        wait: beat * 0.5,
        filter: [{
            type : 'highpass',
            frequency: 5000,
            q : 5
        }]
    });

    hato.play({
        wait: beat * 1,
        filter: [{
            type : 'highpass',
            frequency: 8000,
            q : 5
        }]
    });


    // step 2
    hat.play({
        wait: beat * 2,
        filter: [{
            type : 'highpass',
            frequency: 5000,
            q : 5
        }]
    });

    hat.play({
        wait: beat * 2.25,
        filter: [{
            type : 'highpass',
            frequency: 8000,
            q : 5
        }]
    });

    hat.play({
        wait: beat * 2.5,
        filter: [{
            type : 'highpass',
            frequency: 8000,
            q : 5
        }]
    });

    hato.play({
        wait: beat * 2.75,
        filter: [{
            type : 'highpass',
            frequency: 8000,
            q : 5
        }]
    });

    hato.play({
        wait: beat * 3.5,
        filter: [{
            type : 'highpass',
            frequency: 8000,
            q : 5
        }]
    });

    /**
     * kick
     */
    kick.play({
        wait: beat * 1
    });

    kick.play({
        wait: beat * 3
    });

    kick.play({
        wait: beat * 5
    });

    kick.play({
        volume  : 0.2,
        wait: beat * 6.95
    });

    kick.play({
        wait: beat * 7
    });

    /**
     * snare
     */
    snare.play({
        wait: beat * 0
    });

    snare.play({
        wait: beat * 2
    });

    snare.play({
        wait: beat * 4
    });

    snare.play({
        wait: beat * 6
    });

    /**
     * synth
     */
    synth.play({
        pitch : 'C5',
        wait : beat * (0.75)
    });

    synth.play({
        pitch : 'F5',
        wait : beat * (0.95)
    });

    synth.play({
        pitch : 'C5',
        wait : beat * (2.75)
    });

    synth.play({
        pitch : 'F5',
        wait : beat * (3)
    });

    synth.play({
        pitch : 'C5',
        wait : beat * (3.5)
    });

    synth.play({
        pitch : 'C7',
        wait : beat * (4)
    });

    synth.play({
        pitch : 'C7',
        wait : beat * (4.25)
    });

    synth.play({
        pitch : 'C7',
        wait : beat * (4.5)
    });

    synth.play({
        pitch : 'C7',
        wait : beat * (4.75)
    });

    synth.play({
        pitch : 'C7',
        wait : beat * (5)
    });

    synth.play({
        pitch : 'C7',
        wait : beat * (5.25)
    });

    synth.play({
        pitch : 'C6',
        wait : beat * (5.5)
    });

};


// start
loop();

// keep loop
setInterval(loop, Math.floor(beat * pattern * 1000));
