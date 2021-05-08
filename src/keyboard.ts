import { typeString } from 'robotjs';

export default class Keyboard {
  public type(string: string): void {
    typeString(string);
  }
}
