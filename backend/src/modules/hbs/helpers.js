import { isActive } from "./activation";

export function activationWrapper(middlewareFactory) {
    return (...args) => {
        if (!isActive()) {
            return (req, res, next) => {
                console.log('Handlebar templates module was not be activated.');
                next();
            }
        }
        return middlewareFactory(...args);
    };
}