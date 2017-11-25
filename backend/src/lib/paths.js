import path from 'path';

const BASE = path.resolve(__dirname, '../..');

const resolve = (...args) => path.resolve(BASE, ...args);

export default {
    //social/backend directory
    base: {
        path: BASE,
        resolve
    },
    //social/backend/src directory
    src: {
        path: resolve('src'),
        resolve: (...args) => resolve('src', ...args)
    }
};