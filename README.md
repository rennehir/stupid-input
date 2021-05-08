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
