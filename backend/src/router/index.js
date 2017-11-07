import paths from '../lib/paths';
import { RouterBuilder } from './router-builder';

export default ({ config, db }) => {
    return new RouterBuilder()
        .configureStatic({
            root: paths.base.resolve('..', 'frontend'),
            extensions: ['html'],
        })
        .route({path: '/', authenticatedRedirect: '/feed'})
        .route({path: '/register'})
        .route({path: '/feed', authenticated: true})
        .build();
}
