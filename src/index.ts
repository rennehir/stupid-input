#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import launchpad from 'launchpadder';
import terminalArt from 'terminal-art';
import Jimp from 'jimp';

import * as fs from 'fs';
import * as PNG from 'pngjs';
import Waifu2x from './Waifu2x'

import { BUTTONS } from './types';
import Mode, { MODE } from './mode';
import Mouse from './mouse';
import { recognize } from './recognize';

import {model} from './scale2.0x_model';

const waifu2x = new Waifu2x({
  scale2xModel: model,
  noiseModel: null,
  scale: 2,
});


const mode = new Mode(launchpad);
const mouse = new Mouse();

const testChar = [
  [0xff0000ff, 0xff0000ff, 0xff0000ff, 0x0000ffff, 0x0000ffff, 0xff0000ff, 0xff0000ff, 0xff0000ff],
  [0xff0000ff, 0xff0000ff, 0x0000ffff, 0x0000ffff, 0x0000ffff, 0x0000ffff, 0xff0000ff, 0xff0000ff],
  [0xff0000ff, 0x0000ffff, 0x0000ffff, 0x0000ffff, 0x0000ffff, 0x0000ffff, 0x0000ffff, 0xff0000ff],
  [0x0000ffff, 0x0000ffff, 0xff0000ff, 0x0000ffff, 0x0000ffff, 0xff0000ff, 0x0000ffff, 0x0000ffff],
  [0x0000ffff, 0xff0000ff, 0xff0000ff, 0x0000ffff, 0x0000ffff, 0xff0000ff, 0xff0000ff, 0x0000ffff],
  [0xff0000ff, 0xff0000ff, 0xff0000ff, 0x0000ffff, 0x0000ffff, 0xff0000ff, 0xff0000ff, 0xff0000ff],
  [0xff0000ff, 0xff0000ff, 0xff0000ff, 0x0000ffff, 0x0000ffff, 0xff0000ff, 0xff0000ff, 0xff0000ff],
  [0xff0000ff, 0xff0000ff, 0xff0000ff, 0x0000ffff, 0x0000ffff, 0xff0000ff, 0xff0000ff, 0xff0000ff],
];

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('p', {
    alias: 'path',
    demandOption: false,
    describe: 'The location of the pad mapping file',
    type: 'string',
  })
  .help('h')
  .alias('h', 'help').argv;

console.log(argv);

const ERROR_TITS_URL = 'http://www.sexytitflash.com/bigimages/very%20big%20tits%2092619412%20153.jpg';

const currentColor = 5;

const generateGrid = () => {
  const arr = [];
  for (let i = 0; i < 8; i++) {
    arr.push(new Array(8));
    for (let j = 0; j < 8; j++) {
      arr[i][j] = false;
    }
  }
  return arr;
};

let grid = generateGrid();

const compareGrid = (grid1, grid2) => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (grid1[i][j] != grid2[i][j]) {
        return false;
      }
    }
  }

  return true;
};

launchpad.on('buttonDown', async (event) => {
  const { pad, type } = event;

  if (type == 'pad') {
    switch (mode.currentMode) {
      case MODE.keyboard: {
        // Do keyboard stuff
        const coord = event.cor;
        const y = coord[0] - 1;
        const x = coord[1] - 1;
        grid[7 - y][x] = !grid[7 - y][x];

        togglePad(event.arrayIndex, pad);
        break;
      }
      case MODE.mouse: {
        // Do mouse stuff
        mouse.moveToCell(event.cor);
        break;
      }
      case MODE.custom: {
        // Do custom stuff
        break;
      }

      default: {
        break;
      }
    }
  }

  if (pad === BUTTONS.UP) mouse.move(0, 10);
  if (pad === BUTTONS.DOWN) mouse.move(0, -10);
  if (pad === BUTTONS.LEFT) mouse.move(-10, 0);
  if (pad === BUTTONS.RIGHT) mouse.move(10, 0);

  if (pad === BUTTONS.MOUSE_LEFT) mouse.click('left');
  if (pad === BUTTONS.MOUSE_RIGHT) mouse.click('right');

  if (pad == BUTTONS.SUBMIT) {
    matprint(grid);

    const image = new Jimp(8, 8, function (err, image) {
      if (err) throw err;

      grid.forEach((row, y) => {
        row.forEach((color, x) => {
          color = color ? 0x000000ff : 0xffffffff;
          image.setPixelColor(color, x, y);
        });
      });

      image.write('test.png', async (err) => {
        if (err) throw err;
        // Get the result here
        const result = await recognize();
        console.log('Result', result);
      });
      waifu2x.calc(image, 8, 8, function(image2x, width, height) {
        const img = new PNG.PNG({width, height})
        img.data = Buffer.from(image2x);
        console.log(img);
        img.pack().pipe(fs.createWriteStream('test2x.png'));
        /* writeFile('./test2x.png', Buffer.from(image2x), err => {
          console.log(err);
        }); */
      }, function(phase, doneRatio, allBlocks, doneBlocks) {
          console.log(doneRatio);
      });
    });

    const match = compareGrid(grid, testChar);

    if (match) {
      console.log(
        '@@@ @@@@@@@  @@  @@@@@@       @@@@@@       @@@@@@@@@@   @@@@@@  @@@@@@@  @@@@@@@ @@@  @@@ @@@\n@@!   @@!   !@  !@@          @@!  @@@      @@! @@! @@! @@!  @@@   @@!   !@@      @@!  @@@ @@@\n!!@   @!!        !@@!!       @!@!@!@!      @!! !!@ @!@ @!@!@!@!   @!!   !@!      @!@!@!@! !@!\n!!:   !!:           !:!      !!:  !!!      !!:     !!: !!:  !!!   !!:   :!!      !!:  !!!    \n:      :        ::.: :        :   : :       :      :    :   : :    :     :: :: :  :   : : :.:\n                                                                                             \n',
      );
    }
  }

  if (pad == 29) {
    setupPad();
  }

  if (pad == BUTTONS.CLEAR) {
    grid = generateGrid();
    launchpad.led.clear();
    setupPad();
    await terminalArt.print(ERROR_TITS_URL, {
      output: 'log',
      maxCharWidth: 60,
    });
  }

  if (pad == BUTTONS.KEYBOARD) {
    mode.changeMode(MODE.keyboard);
  }
  if (pad == BUTTONS.MOUSE) {
    mode.changeMode(MODE.mouse);
  }
  if (pad === BUTTONS.CUSTOM) {
    mode.changeMode(MODE.custom);
  }
});

launchpad.connect(1, 1);

const togglePad = (arrayIndex, pad) => {
  launchpad.led.keys[arrayIndex].color > 0 ? launchpad.led.off(pad) : launchpad.led.on(pad, currentColor);
};

const setupPad = () => {
  launchpad.led.on(BUTTONS.SUBMIT, 21);
  launchpad.led.on(BUTTONS.CLEAR, 3);
};

const matprint = (grid) => {
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
