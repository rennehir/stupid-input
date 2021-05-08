import { dragMouse, getMousePos, getScreenSize, moveMouseSmooth, mouseClick, mouseToggle } from 'robotjs';
import Launchpad from 'launchpadder';

import { BUTTONS } from './types';

type MousePosition = {
  x: number;
  y: number;
};

export default class Mouse {
  private currentPosition: MousePosition;
  private isDragging: boolean;
  private launchpad: Launchpad;

  constructor(launchpad: Launchpad) {
    this.launchpad = launchpad;
    this.currentPosition = getMousePos();
  }

  public getCurrentMousePosition(): MousePosition {
    return this.currentPosition;
  }

  public move(x: number, y: number): void {
    const newMousePos = {
      x: this.currentPosition.x + x,
      y: this.currentPosition.y - y,
    };
    if (this.isDragging) {
      dragMouse(newMousePos.x, newMousePos.y);
    } else {
      moveMouseSmooth(newMousePos.x, newMousePos.y);
    }
    this.currentPosition = newMousePos;
  }

  public moveTo(newPosition: MousePosition): void {
    moveMouseSmooth(newPosition.x, newPosition.y, 1);
    this.currentPosition = newPosition;
  }

  public moveToCell(cell: [number, number]): void {
    cell.forEach((c) => {
      if (c < 1 || c > 8) {
        throw new Error('Invalid cell');
      }
    });

    const screenSize = getScreenSize();

    const blockHeight = screenSize.height / 8;
    const blockWidth = screenSize.width / 8;

    const x = blockWidth * cell[1] - blockWidth / 2;
    const y = screenSize.height - (blockHeight * cell[0] - blockHeight / 2);

    this.moveTo({ x, y });
  }

  public click(button: 'left' | 'right' | 'middle', double?: boolean): void {
    mouseClick(button, double);
  }

  public toggleDragging(): void {
    this.isDragging = !this.isDragging;
    if (this.isDragging) {
      mouseToggle('down');
      this.launchpad.led.on(BUTTONS.MOUSE_DRAG, 98);
    } else {
      mouseToggle('up');
      this.launchpad.led.off(BUTTONS.MOUSE_DRAG);
    }
  }
}
