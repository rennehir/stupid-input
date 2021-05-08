import { createWorker } from 'tesseract.js';
import path from 'path';

const worker = createWorker({
  langPath: path.join(__dirname, '..', 'lang-data'),
  logger: (m) => console.log(m),
});

export const initializeWorker = async () => {
  console.log('initializing worker');
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  });
}

export const recognize = async () => {
  const { data } = await worker.recognize(path.join(__dirname, '..', 'test.png'));
  //console.log('worker is done', data);
  const { text } = data;
  return text;
};
