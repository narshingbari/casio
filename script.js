const bankOne = {
  'Heater-1': {
    keyCode: 81,
    keyTrigger: 'Q',
    url: 'Heater-1' },

  'Heater-2': {
    keyCode: 87,
    keyTrigger: 'W',
    url: 'Heater-2' },

  'Heater-3': {
    keyCode: 69,
    keyTrigger: 'E',
    url: 'Heater-3' },

  'Heater-4': {
    keyCode: 65,
    keyTrigger: 'A',
    url: 'Heater-4_1' },

  'Clap': {
    keyCode: 83,
    keyTrigger: 'S',
    url: 'Heater-6' },

  'Open-HH': {
    keyCode: 68,
    keyTrigger: 'D',
    url: 'Dsc_Oh' },

  "Kick_n_Hat": {
    keyCode: 90,
    keyTrigger: 'Z',
    url: 'Kick_n_Hat' },

  'Kick': {
    keyCode: 88,
    keyTrigger: 'X',
    url: 'RP4_KICK_1' },

  'Closed-HH': {
    keyCode: 67,
    keyTrigger: 'C',
    url: 'Cev_H2' } };


const bankTwo = {
  'Chord-1': {
    keyCode: 81,
    keyTrigger: 'Q',
    url: 'Chord_1' },

  'Chord-2': {
    keyCode: 87,
    keyTrigger: 'W',
    url: 'Chord_2' },

  'Chord-3': {
    keyCode: 69,
    keyTrigger: 'E',
    url: 'Chord_3' },

  'Shaker': {
    keyCode: 65,
    keyTrigger: 'A',
    url: 'Give_us_a_light' },

  'Open-HH': {
    keyCode: 83,
    keyTrigger: 'S',
    url: 'Dsc_Ohh' },

  'Closed-HH': {
    keyCode: 68,
    keyTrigger: 'D',
    url: 'Bld_H1' },

  "Punchy-Kick": {
    keyCode: 90,
    keyTrigger: 'Z',
    url: 'punchy_kick_1' },

  'Side-Stick': {
    keyCode: 88,
    keyTrigger: 'X',
    url: 'side_stick_1' },

  'Snare': {
    keyCode: 67,
    keyTrigger: 'C',
    url: 'Brk_Snr' } };


const audiosrc = "https://s3.amazonaws.com/freecodecamp/drums/",
drumMachine = $("#drum-machine .left"),
display = $("#display"),
volume = $('#volume');




function setupKit(e) {
  if (e.checked) {
    setup_piano();
  } else
  {
    setup_heater();
  }
}
function setup_heater() {
  drumMachine.empty();
  let html = "";
  let arr = Object.keys(bankOne);
  for (let i = 0; i < arr.length; i++) {
    let attrname = arr[i];
    html += '<button type="button" name="drum-pad" id="' + attrname + '" class="btn btn-primary btn-cal drum-pad" >' + bankOne[attrname].keyTrigger + '<audio src="' + audiosrc + bankOne[attrname].url + '.mp3" id="' + bankOne[attrname].keyTrigger + '" class="clip" type="audio/mp3"></audio></button>';

    if (i % 3 == 2) {
      drumMachine.append("<div>" + html + "</div>");
      html = "";
    }
  }
  $("button[name='drum-pad']").on('click', function (e) {
    e.preventDefault();
    update_output(this.id, bankOne);
  });
  $("button[name='drum-pad']").on('keydown', function (e) {
    e.preventDefault();
    press_key(e.which, bankOne);
  });

}
function setup_piano() {
  drumMachine.empty();
  let html = "";
  let arr = Object.keys(bankTwo);
  for (let i = 0; i < arr.length; i++) {
    let attrName = arr[i];
    html += '<button type="button" name="drum-pad" id="' + attrName + '" class="btn btn-primary btn-cal drum-pad" >' + bankTwo[attrName].keyTrigger + '<audio src="' + audiosrc + bankTwo[attrName].url + '.mp3" id="' + bankTwo[attrName].keyTrigger + '" class="clip" type="audio/mp3"></audio></button>';

    if (i % 3 == 2) {
      drumMachine.append("<div>" + html + "</div>");
      html = "";
    }
  }
  $("button[name='drum-pad']").on('click', function (e) {
    e.preventDefault();
    update_output(this.id, bankTwo);
  });
  $("button[name='drum-pad']").on('keydown', function (e) {
    e.preventDefault();
    press_key(e.which, bankTwo);
  });
}


function press_key(key, kit) {
  switch (key) {
    case 81: // Q
      key_trigger = 'Q';
      break;
    case 87: // W
      key_trigger = 'W';
      break;
    case 69: // E
      key_trigger = 'E';
      break;
    case 65: // A
      key_trigger = 'A';
      break;
    case 83: // S
      key_trigger = 'S';
      break;
    case 68: // D
      key_trigger = 'D';
      break;
    case 90: // Z
      key_trigger = 'Z';
      break;
    case 88: // X
      key_trigger = 'X';
      break;
    case 67: // C
      key_trigger = 'C';
      break;}

  play_sound(key_trigger, kit);
}
function update_output(id, kit, vol) {
  display.val(id);
  play_sound(read_prop(kit, id, "keyTrigger"), kit);
}
function play_sound(key_trigger, kit) {
  let sound = document.getElementById(key_trigger);
  set_volume(sound);
  sound.play();
}
function set_volume(sound) {
  let vol = volume.val();
  sound.volume = vol / 100;
}
function read_prop(obj, prop, prop1) {
  return obj[prop][prop1];
}
function set_power(e) {
  let arr = Object.keys(bankOne);
  if (document.getElementById('kit').checked) {
    arr = Object.keys(bankTwo);
  }
  if (e.checked) {
    for (var i = 0; i < arr.length; i++) {
      document.getElementById(arr[i]).disabled = false;
    }
  } else
  {
    for (var i = 0; i < arr.length; i++) {
      document.getElementById(arr[i]).disabled = true;
    }
  }
}

setup_heater();