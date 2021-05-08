export enum BUTTONS {
  SUBMIT = 98,
  CLEAR = 19,
  KEYBOARD = 97,
  MOUSE = 95,
  CUSTOM = 96,
  UP = 91,
  DOWN = 92,
  LEFT = 93,
  RIGHT = 94,
  MOUSE_LEFT = 89,
  MOUSE_RIGHT = 79,
  MOUSE_DRAG = 69,
  ALT = 59,
  COMMAND = 49,
  CONTROL = 39,
  SHIFT = 29,
}

export enum MODE {
  keyboard,
  specials,
  mouse,
  custom,
}

export type MODIFIER = 'alt' | 'command' | 'control' | 'shift';

export type KEY =
  | 'backspace'
  | 'delete'
  | 'enter'
  | 'tab'
  | 'escape'
  | 'up'
  | 'down'
  | 'right'
  | 'left'
  | 'home'
  | 'end'
  | 'pageup'
  | 'pagedown'
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'
  | 'f12'
  | 'command'
  | 'alt'
  | 'control'
  | 'shift'
  | 'right_shift'
  | 'space'
  | 'printscreen'
  | 'insert'
  | 'audio_mute'
  | 'audio_vol_down'
  | 'audio_vol_up'
  | 'audio_play'
  | 'audio_stop'
  | 'audio_pause'
  | 'audio_prev'
  | 'audio_next'
  | 'audio_rewind'
  | 'audio_forward'
  | 'audio_random'
  | 'numpad_0'
  | 'numpad_1'
  | 'numpad_2'
  | 'numpad_3'
  | 'numpad_4'
  | 'numpad_5'
  | 'numpad_6'
  | 'numpad_7'
  | 'numpad_8'
  | 'numpad_9'
  | 'lights_mon_up'
  | 'lights_mon_down'
  | 'lights_kbd_toggle'
  | 'lights_kbd_up'
  | 'lights_kbd_down';
