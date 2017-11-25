export function isFunction(object) {
    const getType = {};
    return object && getType.toString.call(object) === '[object Function]';
}

export function isArray(object) {
    return object instanceof Array;
}