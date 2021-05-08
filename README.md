# StUPID - Standard Unified Primary Input Device

[![npm version](https://badge.fury.io/js/stupid-input.svg)](https://badge.fury.io/js/stupid-input)

This project is created a a part of [StUpiD hAcK 2021 by Junction](https://app.hackjunction.com/events/stupid-hack-2021).

![photo_2021-05-08_15-55-55](https://user-images.githubusercontent.com/24566763/117542143-17d1ce80-b020-11eb-9f8e-7617d60e470f.jpg)

## Installation

```bash
npm install -g stupid-input
```

## Usage

First connect your [Novation Launchpad Mini MK3](https://novationmusic.com/en/launch/launchpad-mini) to your computer and then run:

```bash
stupid-input
```

## What do I have to press?

### Mouse

#### Moving

The arrow buttons on the left side of the top row move the mouse a couple of pixels per press.

#### Clicking

Left click is the topmost button of the rightmost column. Right click is right below it.

#### Dragging

Below the right click button is the mouse drag button. If the light is on your mouse button is pressed and you can drag or select things.

### Modifier keys

In the rightmost column from fourth until seventh are the modifier keys in this order from top:

1. alt
2. command
3. control
4. shift

They also toggle on press.

### Choosing a mode

There are two modes (third one maybe coming), keyboard and fast mouse.

1. Fast mouse mode - top row, fifth button from left
2. Keyboard mode - top row, seventh button from left

### Modes

#### Fast mouse mode

Press a white pad, and the cursor moves to that area of the screen

#### Keyboard mode

Draw a letter with the lights and press submit button (top row, rightmost button). You can reset your drawing with the reset button (bottom right corner).

## Built with

- [Nolux/Launchpadder](https://github.com/Nolux/Launchpadder) for communicating with the device
- [octalmage/robotjs](https://github.com/octalmage/robotjs) for commanding the computer
- [naptha/tesseract.js](https://github.com/naptha/tesseract.js) for identifying letters from a pixelated image
- [oliver-moran/jimp](https://github.com/oliver-moran/jimp) for creating pixelated images from the launchpad pixel matrix

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

~~Please make sure to update tests as appropriate.~~

## Authors

See also the list of [contributors](https://github.com/rennehir/stupid-input/graphs/contributors) who participated in this project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
