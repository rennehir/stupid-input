#!/usr/bin/env node

import launchpad from 'launchpadder';

console.log(launchpad);

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

const testChar = [
  [false, false, false, true, true, false, false, false],
  [false, false, true, true, true, true, false, false],
  [false, true, true, true, true, true, true, false],
  [true, true, false, true, true, false, true, true],
  [true, false, false, true, true, false, false, true],
  [false, false, false, true, true, false, false, false],
  [false, false, false, true, true, false, false, false],
  [false, false, false, true, true, false, false, false],
];

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

launchpad.on('connected', (e) => {
  // Setup panel
  launchpad.led.clear();
  launchpad.led.on(99, 22);
});

launchpad.on('buttonDown', (event) => {
  console.log(event);
  const { pad, type } = event;
  if (type == 'pad') {
    const coord = event.cor;
    const y = coord[0] - 1;
    const x = coord[1] - 1;
    grid[7 - y][x] = !grid[7 - y][x];

    togglePad(event.arrayIndex, pad);
  }

  if (pad == 98) {
    const match = compareGrid(grid, testChar);

    if (match) {
      console.log(
        '@@@ @@@@@@@  @@  @@@@@@       @@@@@@       @@@@@@@@@@   @@@@@@  @@@@@@@  @@@@@@@ @@@  @@@ @@@\n@@!   @@!   !@  !@@          @@!  @@@      @@! @@! @@! @@!  @@@   @@!   !@@      @@!  @@@ @@@\n!!@   @!!        !@@!!       @!@!@!@!      @!! !!@ @!@ @!@!@!@!   @!!   !@!      @!@!@!@! !@!\n!!:   !!:           !:!      !!:  !!!      !!:     !!: !!:  !!!   !!:   :!!      !!:  !!!    \n:      :        ::.: :        :   : :       :      :    :   : :    :     :: :: :  :   : : :.:\n                                                                                             \n',
      );
    }
  }

  if (pad == 91) {
    grid = generateGrid();
    launchpad.led.clear();
  }
});

launchpad.connect(1, 1);

const togglePad = (arrayIndex, pad) => {
  launchpad.led.keys[arrayIndex].color > 0 ? launchpad.led.off(pad) : launchpad.led.on(pad, currentColor);
};

console.log(
  "@@@ @@@@@@@  @@  @@@@@@       @@@@@@       @@@@@@@@@@   @@@@@@  @@@@@@@  @@@@@@@ @@@  @@@ @@@\n@@!   @@!   !@  !@@          @@!  @@@      @@! @@! @@! @@!  @@@   @@!   !@@      @@!  @@@ @@@\n!!@   @!!        !@@!!       @!@!@!@!      @!! !!@ @!@ @!@!@!@!   @!!   !@!      @!@!@!@! !@!\n!!:   !!:           !:!      !!:  !!!      !!:     !!: !!:  !!!   !!:   :!!      !!:  !!!    \n:      :        ::.: :        :   : :       :      :    :   : :    :     :: :: :  :   : : :.:\n                                                                                             \n",
);

const matprint = (mat) => {
  const shape = [mat.length, mat[0].length];
  function col(mat, i) {
      return mat.map(row => row[i]);
  }
  const colMaxes = [];
  for (let i = 0; i < shape[1]; i++) {
      colMaxes.push(Math.max.apply(null, col(mat, i).map(n => n.toString().length)));
  }

  mat.forEach(row => {
      console.log.apply(null, row.map((val, j) => {
          return new Array(colMaxes[j]-val.toString().length+1).join(" ") + val.toString() + "  ";
      }));
  });
}

const inputRaw = [
  [
    false, false,
    true,  true,
    true,  false,
    false, false
  ],
  [
    false, false,
    true,  false,
    true,  false,
    false, false
  ],
  [
    false, false,
    true,  false,
    false, true,
    false, false
  ],
  [
    false, false,
    false, false,
    false, true,
    false, false
  ],
  [
    true,  false,
    false, false,
    false, true,
    false, false
  ],
  [
    true,  false,
    false, false,
    false, true,
    false, false
  ],
  [
    true,  false,
    false, false,
    true,  false,
    false, false
  ],
  [
    true,  true,
    true,  true,
    true,  false,
    false, false
  ]
]

const grid2 = inputRaw.map(row => row)

const output = grid2.map(row => row.map(value => value ? 'X' : '.'));


matprint(output)
