import { getMousePos, getScreenSize, moveMouseSmooth } from 'robotjs';

type MousePosition = {
  x: number;
  y: number;
};

type Size = {
  height: number;
  width: number;
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

  public moveTo(newPosition: MousePosition): void {
    moveMouseSmooth(newPosition.x, newPosition.y);
    this.currentPosition = newPosition;
  }

  public moveToCell(cell: [number, number]): void {
    cell.forEach((c) => {
      if (c < 1 || c > 8) {
        throw new Error('Invalid cell');
      }
    });

    const screenSize = getScreenSize();

    const x = (screenSize.width / 8) * cell[0];
    const y = (screenSize.height / 8) * cell[1];

    this.moveTo({ x, y });
  }
}
