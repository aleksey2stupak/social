import authController from './auth.controller';

export default ({ app }) => {
    app.post('/login',                  authController.login);
    app.post('/register',               authController.register);
    app.get('/logout',                  authController.logout);
}

