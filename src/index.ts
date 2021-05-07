#!/usr/bin/env node


console.log(
  "@@@ @@@@@@@  @@  @@@@@@       @@@@@@       @@@@@@@@@@   @@@@@@  @@@@@@@  @@@@@@@ @@@  @@@ @@@\n@@!   @@!   !@  !@@          @@!  @@@      @@! @@! @@! @@!  @@@   @@!   !@@      @@!  @@@ @@@\n!!@   @!!        !@@!!       @!@!@!@!      @!! !!@ @!@ @!@!@!@!   @!!   !@!      @!@!@!@! !@!\n!!:   !!:           !:!      !!:  !!!      !!:     !!: !!:  !!!   !!:   :!!      !!:  !!!    \n:      :        ::.: :        :   : :       :      :    :   : :    :     :: :: :  :   : : :.:\n                                                                                             \n",
);

const matprint = (mat) => {
  let shape = [mat.length, mat[0].length];
  function col(mat, i) {
      return mat.map(row => row[i]);
  }
  let colMaxes = [];
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

const grid = inputRaw.map(row => row)

const output = grid.map(row => row.map(value => value ? 'X' : '.'));


matprint(output)