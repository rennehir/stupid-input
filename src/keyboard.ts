import { keyTap, typeString } from 'robotjs';
import Launchpad from 'launchpadder';

import { BUTTONS, KEY, MODIFIER } from './types';

export interface IKeyboard {
  type(string: string): void;
  tap(key: KEY | string): void;
  toggleModifier(modifier: MODIFIER): void;
}

export default class Keyboard implements IKeyboard {
  private modifiers: MODIFIER[] = [];
  private launchpad: Launchpad;

  constructor(launchpad: Launchpad) {
    this.launchpad = launchpad;
  }

  public type(string: string): void {
    typeString(string);
  }

  public tap(key: KEY | string): void {
    keyTap(key.trim(), this.modifiers);
  }

  public toggleModifier(modifier: MODIFIER): void {
    const modifierButton = this.getModifierButton(modifier);
    if (this.modifiers.indexOf(modifier) >= 0) {
      // poista
      this.launchpad.led.off(modifierButton);
      this.modifiers.splice(this.modifiers.indexOf(modifier));
    } else {
      // lisää
      this.launchpad.led.on(modifierButton, this.getModifierColor(modifier));
      this.modifiers.push(modifier);
    }
    console.log('currentModifiers', this.modifiers);
  }

  private getModifierButton(modifier: MODIFIER): BUTTONS {
    switch (modifier) {
      case 'alt':
        return BUTTONS.ALT;
      case 'command':
        return BUTTONS.COMMAND;
      case 'control':
        return BUTTONS.CONTROL;
      case 'shift':
        return BUTTONS.SHIFT;

      default:
        return null;
    }
  }

  private getModifierColor(modifier: MODIFIER): number {
    switch (modifier) {
      case 'alt':
        return 69;
      case 'command':
        return 96;
      case 'control':
        return 66;
      case 'shift':
        return 99;

      default:
        return null;
    }
  }
}
