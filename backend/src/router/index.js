import { Router } from 'express';
import { authenticatedRedirect } from '../middleware/authenticated-redirect';
import { authenticated } from '../modules/security';

export default ({ config, db }) => {
    let router = Router();

    // pages router
    router.get('/', authenticatedRedirect('/feed'));
    router.get('/feed', authenticated);

    return router;
}
