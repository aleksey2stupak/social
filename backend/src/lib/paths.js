import path from 'path';

const BASE = path.resolve(__dirname, '../..');

const resolve = (...args) => path.resolve(BASE, ...args);

export default {
    base: {
        path: BASE,
        resolve
    },
    src: {
        path: resolve('src'),
        resolve: (...args) => resolve('src', ...args)
    }
};