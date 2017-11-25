import paths from '../lib/paths';
import { RouterBuilder } from './router-builder';

export default ({ app, config, db }) => {
    return new RouterBuilder(app)
        .configureStatic({
            root: paths.base.resolve('..', 'frontend'),
            extensions: ['html'],
        })
        .route({path: '/', authenticatedRedirect: '/feed'})
        .route({path: '/register'})
        .route({path: '/feed', authenticated: true})
        .hbsRoute({ path: '/friends', authenticated: true, params: { layout: false } })
        .build();
}
