const func = require('../../../../../../../lib/cli-command.js').func;

// special compact mocks for this test:
const mysnap = [];
const mockpushit = x => mysnap.push(x);
jest.mock('elapsed-time', () => ({
  new: () => ({
    start: () => ({
      getValue: () => `12.345s`
    })
  })
}));
jest.mock('fs-extra', () => ({
  outputFile: (outputFileName, theContent) => {
    mockpushit({
      outputFileName: outputFileName.replace(/\\/g, '/'),
      theContent
    });
    return Promise.resolve();
  },
  ensureDir: (dir) => {
    mockpushit({ ensureDir: dir.replace(/\\/g, '/') });
    return Promise.resolve();
  },
}));

// TBD hackish mock:
global.console = {
  info: (...args) => {
    mockpushit({ info: [].concat(args) });
  },
  log: (...args) => {
    mockpushit({ log: [].concat(args) });
  },
  warn: (...args) => {
    mockpushit({ warn: [].concat(args) });
  },
};

test('create alice-bobbi module with logging with --use-cocoapods for iOS', async () => {
  const args = ['alice-bobbi'];

  const config = 'bogus';

  await func(args, config, { platforms: 'ios', useCocoapods: true });

  expect(mysnap).toMatchSnapshot();
});