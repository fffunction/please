import test from 'ava';
import please from '../dist/please.js';

test('get', t => {
    please.get();
    t.pass();
    t.end();
});
