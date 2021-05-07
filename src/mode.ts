import launchpad from 'launchpadder';

const enum ModeType {
  keyboard,
  mouse,
  custom,
}

export default class Mode {
  public currentMode: ModeType;
  constructor() {
    this.currentMode = ModeType.keyboard;
  }

  public changeMode(mode: ModeType): void {
    this.currentMode = mode;
  }

  private setModeLights(mode: ModeType): void {
    console.log('setting mode', mode)
  }
}
