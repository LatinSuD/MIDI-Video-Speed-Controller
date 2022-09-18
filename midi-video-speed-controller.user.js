// ==UserScript==
// @name         Midi video speed controller
// @namespace    http://latinsud.com/
// @version      0.2
// @description  Control the speed of videos using a MIDI keyboard
// @author       LatinSuD
// @match        *
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // May vary
    var MIDI_DATA_1 = 176
    var MIDI_DATA_2 = -1

    // Threshold around speed 1x
    var threshold = 0.1;

    // Whether to invert
    var invert=0;


    var desiredSpeed = null;
    var lastSetSpeed = null;

    var myTimer = null;

    function timerHandler() {
        if (desiredSpeed && ( desiredSpeed != lastSetSpeed )) {
            document.querySelectorAll('video').forEach(function(aVideo) {
                if (!aVideo.paused && !aVideo.ended && aVideo.readyState > 2) {
                    lastSetSpeed=desiredSpeed;
                    aVideo.playbackRate=desiredSpeed;
                    console.log("MIDI Set speed to " + desiredSpeed);
                }
            })
        }
    }


    function midiHandler(valor) {

        // Normalize entre 0 y 1
        var valor2 = valor/128;
        var valor3;

        if (invert)
            valor2 = 1-valor2;        
        
        // Apply threshold
        if (valor2 <= 0.5 - threshold ) {
            valor3 = valor2 * (0.5/(0.5-threshold));
        } else if (valor2 > 0.5 - threshold && valor2 < 0.5 + threshold) {
            valor3 = 0.5
        } else {
            valor3 = valor2 * (0.5 / (0.5-threshold)) + (1-(0.5 / (0.5-threshold)));
        }

        // Calculate speed curve
        var speed;
        if (valor3 < 0.5) {
            // lower speeds linear
            speed=2*valor3;
        } else {
            // higher speeds polynomial
            speed=Math.pow(2*valor3,3)
        }

        console.log(parseInt(valor2*100), parseInt(valor3*100), parseInt(speed*100))

        if (speed < 0.0625) speed = 0.0625;
        if (speed > 16) speed = 16;

        desiredSpeed = speed;

        if (!myTimer) {
            myTimer = setInterval(timerHandler, 100);
        }
    }

    navigator.requestMIDIAccess()
  .then((access) => {
    // Get lists of available MIDI controllers
    const inputs = access.inputs;
      console.log(inputs);
    const outputs = access.outputs;

    const inputText = [];
    const outputText = [];

    inputs.forEach((midiInput) => {
        midiInput.onmidimessage = function(message) {
                        if (message.data[0] == MIDI_DATA_1 && ( message.data[1] == MIDI_DATA_2 || MIDI_DATA_2 == -1 ) ) {
                            midiHandler(message.data[2])
                        }
                }})
 });

    // Your code here...
})();
