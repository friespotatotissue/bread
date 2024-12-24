// Sound configuration
var gSoundPath = "/piano/audio/default/";
var gSoundExt = ".wav.mp3";

// Initialize audio context
var context = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = context.createGain();
gainNode.connect(context.destination);
gainNode.gain.value = 0.3;

// Piano key mapping
var keyMap = {
    65: "c4",  // A
    87: "cs4", // W
    83: "d4",  // S
    69: "ds4", // E
    68: "e4",  // D
    70: "f4",  // F
    84: "fs4", // T
    71: "g4",  // G
    89: "gs4", // Y
    72: "a4",  // H
    85: "as4", // U
    74: "b4",  // J
    75: "c5",  // K
};

// Audio buffer cache
var audioBuffers = {};

// Load audio files
function loadSound(key) {
    var url = gSoundPath + key + gSoundExt;
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => context.decodeAudioData(buffer))
        .then(decodedData => {
            audioBuffers[key] = decodedData;
        })
        .catch(error => console.error('Error loading sound:', error));
}

// Load all sounds
Object.values(keyMap).forEach(loadSound);

// Play sound function
function playSound(key) {
    if (audioBuffers[key]) {
        var source = context.createBufferSource();
        source.buffer = audioBuffers[key];
        source.connect(gainNode);
        source.start(0);
    }
}

// Keyboard event handlers
document.addEventListener('keydown', function(event) {
    if (keyMap[event.keyCode] && !event.repeat) {
        playSound(keyMap[event.keyCode]);
        var keyElement = document.querySelector(`[data-note="${keyMap[event.keyCode]}"]`);
        if (keyElement) {
            keyElement.classList.add('play');
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (keyMap[event.keyCode]) {
        var keyElement = document.querySelector(`[data-note="${keyMap[event.keyCode]}"]`);
        if (keyElement) {
            keyElement.classList.remove('play');
        }
    }
});

// Mouse event handlers
document.querySelectorAll('#piano .key').forEach(key => {
    key.addEventListener('mousedown', function() {
        var note = this.getAttribute('data-note');
        if (note) {
            playSound(note);
            this.classList.add('play');
        }
    });

    key.addEventListener('mouseup', function() {
        this.classList.remove('play');
    });

    key.addEventListener('mouseleave', function() {
        this.classList.remove('play');
    });
}); 