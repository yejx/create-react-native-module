const lib = require('../../../../../lib/lib.js');

const ioInject = require('../../../helpers/io-inject.js');

test('create alice-bobbi module with config options for Android only', () => {
  const mysnap = [];

  const inject = ioInject(mysnap);

  const options = {
    platforms: ['android'],
    name: 'alice-bobbi',
    packageIdentifier: 'com.alicebits',
    githubAccount: 'alicebits',
    authorName: 'Alice',
    authorEmail: 'contact@alice.me',
    license: 'ISC',
  };

  return lib(options, inject)
    .then(() => { expect(mysnap).toMatchSnapshot(); });
});
