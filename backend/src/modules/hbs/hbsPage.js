import { isFunction, isArray } from "../../utils/lang.utils";
import { activationWrapper } from "./helpers";

function promiseWrapper(dataLoader) {
    return req => {
        const data = dataLoader(req);
        if (data == null) {
            return Promise.resolve();
        }
        if (isFunction(data.then)) {
            return data;
        }
        return Promise.resolve(data);
    }
}

function compositeDataLoader(loaders) {
    return Promise.all(loaders)
        .then(results => {
            results.reduce((data, result) => ({ ...data, ...result }), {});
        });
}

function normalizeDataLoader(dataLoader) {
    if (isFunction(dataLoader)) {
        return promiseWrapper(dataLoader);
    }
    if (isArray(dataLoader)) {
        return compositeDataLoader(dataLoader.map(normalizeDataLoader));
    }
    return () => Promise.resolve(dataLoader);
}

function normalizeParams(params) {
    if (params == null || isFunction(params) || isArray(params)) {
        return {
            dataLoader: normalizeDataLoader(params),
        };
    }
    return {
        ...params,
        dataLoader: normalizeDataLoader(params.data),
    };
}

function getViewName(url) {
    if (url.charAt(0) === '/') {
        return url.substring(1);
    }
    return url;
}

function hsbPageMiddleware(params, req, res, next) {
    const { dataLoader, ...pageParams } = params;
    const path = getViewName(req.originalUrl);
    dataLoader(req)
        .then(data => {
            const context = { ...data, ...pageParams };
            console.log(`Render page "${path}" with context:`);
            console.log(context);
            res.render(path, context);
        })
        .catch(error => {
            next(error);
        });
}

function hsbPageMiddlewareFactory(params) {
    return (...args) => hsbPageMiddleware(normalizeParams(params), ...args);
}

/**
 * Middleware, that allow render page from Handlebar template
 */
export const hsbPage = activationWrapper(hsbPageMiddlewareFactory);
hsbPage.middlewareName = 'Handlebar template renderer';
