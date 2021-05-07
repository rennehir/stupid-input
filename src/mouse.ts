import { getMousePos, moveMouseSmooth } from 'robotjs';

type MousePosition = {
  x: number;
  y: number;
};

export default class Mouse {
  private currentPosition: MousePosition;

  constructor() {
    this.currentPosition = getMousePos();
  }

  public getCurrentMousePosition(): MousePosition {
    return this.currentPosition;
  }

  public move(x: number, y: number): void {
    const newMousePos = {
      x: this.currentPosition.x + x,
      y: this.currentPosition.y + y,
    };
    moveMouseSmooth(newMousePos.x, newMousePos.y);
    this.currentPosition = newMousePos;
  }

  public moveToCell(cell: [number, number]): void {
    cell.forEach((c) => {
      if (c < 1 || c > 8) {
        throw new Error('Invalid cell');
      }
    });

    // TODO: Move to cell
  }
}
