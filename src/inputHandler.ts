import Jimp from 'jimp';
import terminalArt from 'terminal-art';

import { BUTTONS, MODE } from './types';
import { recognize } from './recognize';

const ERROR_TITS_URL = 'http://www.sexytitflash.com/bigimages/very%20big%20tits%2092619412%20153.jpg';

type Grid = boolean[][];

type Event = {
  pad: number;
  type: string;
  cor: [number, number];
  arrayIndex: number;
};

export default class InputHandler {
  private launchpad;
  private mouse;
  private mode;
  private grid: Grid;
  private currentColor = 5;

  constructor(launchpad, mouse, mode) {
    this.launchpad = launchpad;
    this.mouse = mouse;
    this.mode = mode;
    this.grid = this.generateGrid();
  }

  public pad(event: Event, mode: MODE): void {
    const { pad } = event;
    switch (mode) {
      case MODE.keyboard:
        // Do keyboard stuff
        const coord = event.cor;
        const y = coord[0] - 1;
        const x = coord[1] - 1;
        this.grid[7 - y][x] = !this.grid[7 - y][x];

        this.togglePad(event.arrayIndex, pad);
        break;
      case MODE.mouse: {
        // Do mouse stuff
        this.mouse.moveToCell(event.cor);
        break;
      }
      case MODE.custom: {
        // Do custom stuff
        break;
      }
      default:
        break;
    }
  }

  public option(pad: number): void {
    switch (pad) {
      case BUTTONS.KEYBOARD:
        this.mode.changeMode(MODE.keyboard);
        break;
      case BUTTONS.MOUSE:
        this.mode.changeMode(MODE.mouse);
        break;
      case BUTTONS.CUSTOM:
        this.mode.changeMode(MODE.custom);
        break;

      case BUTTONS.UP:
        this.mouse.move(0, 10);
        break;
      case BUTTONS.DOWN:
        this.mouse.move(0, -10);
        break;
      case BUTTONS.LEFT:
        this.mouse.move(-10, 0);
        break;
      case BUTTONS.RIGHT:
        this.mouse.move(10, 0);
        break;

      case BUTTONS.MOUSE_LEFT:
        this.mouse.click('left');
        break;
      case BUTTONS.MOUSE_RIGHT:
        this.mouse.click('right');
        break;

      case BUTTONS.SUBMIT:
        this.submit(this.grid);
        break;

      case BUTTONS.CLEAR:
        this.clear();
        break;

      default:
        console.log(`Unsupported option button: ${pad}`);
        break;
    }
  }

  private submit(grid: Grid): void {
    this.matprint(grid);
    const image = new Jimp(8, 8, function (err, image) {
      if (err) throw err;
      grid.forEach((row, y) => {
        row.forEach((cell, x) => {
          const color = cell ? 0x000000ff : 0xffffffff;
          image.setPixelColor(color, x, y);
        });
      });

      image.resize(28, 28).write('test.png', async (err) => {
        if (err) throw err;
        // Get the result here
        const result = await recognize();
        result === '' ? console.log('Could not recognize input!') : console.log('Result', result);
      });
    });
  }

  private clear(): void {
    this.grid = this.generateGrid();
    this.launchpad.led.clear();
    this.setupPad();
    terminalArt.print(ERROR_TITS_URL, {
      output: 'log',
      maxCharWidth: 60,
    });
  }

  private setupPad(): void {
    this.launchpad.led.on(BUTTONS.SUBMIT, 21);
    this.launchpad.led.on(BUTTONS.CLEAR, 3);
  }

  private togglePad = (arrayIndex: number, pad: number) => {
    this.launchpad.led.keys[arrayIndex].color > 0
      ? this.launchpad.led.off(pad)
      : this.launchpad.led.on(pad, this.currentColor);
  };

  private generateGrid(): Grid {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push(new Array(8));
      for (let j = 0; j < 8; j++) {
        arr[i][j] = false;
      }
    }
    return arr;
  }

  private compareGrid = (grid1: Grid, grid2: Grid) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (grid1[i][j] != grid2[i][j]) {
          return false;
        }
      }
    }

    return true;
  };

  private matprint = (grid: Grid) => {
    const mat = grid.map((row) => row.map((value) => (value ? 'X' : '.')));
    const shape = [mat.length, mat[0].length];
    function col(mat, i) {
      return mat.map((row) => row[i]);
    }
    const colMaxes = [];
    for (let i = 0; i < shape[1]; i++) {
      colMaxes.push(
        Math.max.apply(
          null,
          col(mat, i).map((n) => n.toString().length),
        ),
      );
    }

    mat.forEach((row) => {
      console.log.apply(
        null,
        row.map((val, j) => {
          return new Array(colMaxes[j] - val.toString().length + 1).join(' ') + val.toString() + '  ';
        }),
      );
    });
  };
}
