import Launchpad from 'launchpadder';

import { BUTTONS, MODE } from './types';

export default class Mode {
  public currentMode: MODE;
  private launchpad: Launchpad;

  constructor(launchpad: Launchpad) {
    this.launchpad = launchpad;
    this.currentMode = MODE.keyboard;
  }

  public changeMode(mode: MODE): void {
    this.currentMode = mode;
    this.setModeLights(mode);
    console.log('changed to mode', MODE[mode]);
  }

  private setModeLights(mode: MODE): void {
    this.launchpad.led.clear();
    switch (mode) {
      case MODE.keyboard:
        this.launchpad.led.pulse(BUTTONS.KEYBOARD, 21);
        this.launchpad.led.off(BUTTONS.MOUSE);
        this.launchpad.led.off(BUTTONS.CUSTOM);
        break;
      case MODE.mouse:
        this.launchpad.led.pulse(BUTTONS.MOUSE, 21);
        this.launchpad.led.off(BUTTONS.KEYBOARD);
        this.launchpad.led.off(BUTTONS.CUSTOM);
        break;
      case MODE.custom:
        this.launchpad.led.pulse(BUTTONS.CUSTOM, 21);
        this.launchpad.led.off(BUTTONS.KEYBOARD);
        this.launchpad.led.off(BUTTONS.MOUSE);
        break;

      default:
        break;
    }
  }
}
