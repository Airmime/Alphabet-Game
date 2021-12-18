/**
 * Function allow to speak somthing.
 * @param {*} whatISay Text to speak.
 */
function useSpeaker(whatISay) {
  let synth = window.speechSynthesis;
  var wahtIspeak = new SpeechSynthesisUtterance(whatISay);
  wahtIspeak.rate = 1.7;
  synth.speak(wahtIspeak);
}
