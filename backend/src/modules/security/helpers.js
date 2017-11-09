import { isActive } from "./activation";

export function activationWrapper(middlewareFactory) {
    return (...args) => {
        if (!isActive()) {
            return (req, res, next) => {
                console.log('Security module was not be activated. Authenticated access to route is disabled.');
                next();
            }
        }
        return middlewareFactory(...args);
    };
}

export function getPermissions(user) {
    return user.permissions;
}

function hasPermission(allowedPermissions, targetPermission) {
    return allowedPermissions.length > 0 && allowedPermissions.indexOf(targetPermission) >= 0;
}

export function hasSomePermission(allowedPermissions, targetPermissions) {
    if (targetPermissions == null || targetPermissions.length === 0) {
        return true;
    }
    return targetPermissions.filter(targetRole => hasPermission(allowedPermissions, targetRole)).length > 0;
}
