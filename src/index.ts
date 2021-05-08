#!/usr/bin/env node
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import launchpad from 'launchpadder';

import InputHandler from './inputHandler';
import Mode from './mode';
import Mouse from './mouse';
import Keyboard from './keyboard';
import { initializeWorker } from './recognize';

const mode = new Mode(launchpad);
const mouse = new Mouse(launchpad);
const keyboard = new Keyboard(launchpad);
const handler = new InputHandler(launchpad, mouse, keyboard, mode);
initializeWorker();

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

launchpad.on('buttonDown', async (event) => {
  const { pad, type } = event;

  switch (type) {
    case 'pad':
      handler.pad(event, mode.currentMode);
      break;

    case 'option':
      handler.option(pad);
      break;

    default:
      throw new Error('Unsupported type');
  }
});

launchpad.connect(1, 1);
