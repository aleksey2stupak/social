import express, { Router } from 'express';
import { authenticated, authenticatedRedirect } from '../modules/security';

function logRoute(route, middlewareNames) {
    if (middlewareNames.length > 0) {
        console.log(`register route "${route.path}" with ${middlewareNames.map(name => `"${name}"`).join(', ')}`);
    } else {
        console.log(`register route "${route.path}"`);
    }
}

export class RouterBuilder {

    constructor() {
        this.staticConfig = null;
        this.routes = [];
    }

    configureStatic(config) {
        this.staticConfig = config;
        return this;
    }

    route(route) {
        this.routes.push(route);
        return this;
    }

    build() {
        const router = Router();

        this.registerRoutes(router);
        this.registerStatic(router);

        return router;
    }

    registerRoutes(router) {
        this.routes.forEach(route => {
            const middleware = [];
            const middlewareNames = [];

            if (route.authenticated) {
                middlewareNames.push(['Authenticated Middleware']);
                middleware.push(authenticated());
            }
            if (route.authenticatedRedirect) {
                middlewareNames.push(['Authenticated Redirect Middleware']);
                middleware.push(authenticatedRedirect(route.authenticatedRedirect));
            }

            router.get(route.path, ...middleware);
            logRoute(route, middlewareNames);
        });
    }

    registerStatic(router) {
        const {root: staticRoot, ...staticConfig} = this.staticConfig;
        router.use(express.static(staticRoot, staticConfig));
    }
}
