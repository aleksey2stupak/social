import { authenticated } from './middleware/authenticated';
import { authenticatedRedirect } from './middleware/authenticated-redirect';
import { allowSomePermissions } from './middleware/allow-some-permissions';
import securityModule from './module';

export {
    authenticated,
    authenticatedRedirect,
    allowSomePermissions,
};

export default securityModule;
