var gSoundPath = "/piano/audio/default/";
var gSoundExt = ".wav.mp3";

var wssport = window.location.hostname == "www.multiplayerpiano.com" ? 443 : 8080;
var gClient = new Client("ws://" + window.location.hostname + ":" + wssport);
gClient.setChannel(channel_id);
// Comment out the client start to work in offline mode
// gClient.start(); 