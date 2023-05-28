import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite')); //rm is for remove and join is the paht to the file to remove(like a path with salshes but commas instead)
  } catch (error) {}
});
