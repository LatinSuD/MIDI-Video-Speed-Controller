# MIDI-Video-Speed-Controller
Control speed of videos playing in your browser using a MIDI keyboard knob.

This is a simple user extension that reads MIDI events using HTML5 API, and then applies speed changes to current video.

# Requirements
- A MIDI keyboard with knobs, sliders, etc
- A browser (currently tested on Chrome)
- A user script engine extension installed in the browser (currently tested with Tampermoneky)


# Instructions
- Install this extension on Tampermonkey
- Find out the MIDI codes of your knob and edit the script (You can find it here https://www.midimonitor.com/). Mines are 176, 25.
- Go to Youtube, play a video and start messing with your knob. The playback speed of the video should change accordingly.

# Demo

https://www.youtube.com/watch?v=WxtF_b_DG_M
