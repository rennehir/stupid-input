import { BUTTONS } from './types';

export enum MODE {
  keyboard,
  mouse,
  custom,
}

export default class Mode {
  public currentMode: MODE;
  private launchpad;

  constructor(launchpad) {
    this.launchpad = launchpad;
    this.currentMode = MODE.keyboard;
  }

  public changeMode(mode: MODE): void {
    this.currentMode = mode;
    this.setModeLights(mode);
  }

  private setModeLights(mode: MODE): void {
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
