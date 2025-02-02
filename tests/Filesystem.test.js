// tests/Filesystem.test.js
const { container, bootstrap } = require('../index');

describe('Filesystem Provider', () => {
  beforeAll(() => {
    bootstrap({ appDir: __dirname });
  });

  test('Can put and get a file on local disk', async () => {
    const filesystem = container.resolve('filesystem');
    const filePath = 'test/file.txt';
    const content = 'Hello, World!';

    await filesystem.put(filePath, content);
    const retrievedContent = await filesystem.get(filePath);

    expect(retrievedContent.toString()).toBe(content);

    await filesystem.delete(filePath);
    const exists = await filesystem.exists(filePath);

    expect(exists).toBe(false);
  });

  // Add more tests for S3 and other disks
});
