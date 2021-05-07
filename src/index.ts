// boop
console.log(
  '@@@ @@@@@@@  @@  @@@@@@       @@@@@@       @@@@@@@@@@   @@@@@@  @@@@@@@  @@@@@@@ @@@  @@@ @@@\n@@!   @@!   !@  !@@          @@!  @@@      @@! @@! @@! @@!  @@@   @@!   !@@      @@!  @@@ @@@\n!!@   @!!        !@@!!       @!@!@!@!      @!! !!@ @!@ @!@!@!@!   @!!   !@!      @!@!@!@! !@!\n!!:   !!:           !:!      !!:  !!!      !!:     !!: !!:  !!!   !!:   :!!      !!:  !!!    \n:      :        ::.: :        :   : :       :      :    :   : :    :     :: :: :  :   : : :.:\n                                                                                             \n',
);

import * as launchpad from 'launchpadder';

console.log(launchpad);

let currentColor = 5;

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

launchpad.on('connected', (e) => {
  // Setup panel
  launchpad.led.clear();
  launchpad.led.on(99, 22);
});

launchpad.on('buttonDown', (event) => {
  console.log(event);
  const { pad, type } = event;
  if (event.type == 'pad') {
    const coord = event.cor;
    const y = coord[0] - 1;
    const x = coord[1] - 1;
    grid[7 - y][x] = !grid[7 - y][x];

    togglePad(event.arrayIndex, pad);
  }

  if (pad == 98) {
    console.log(grid);
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
