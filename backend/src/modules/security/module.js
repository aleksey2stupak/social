import session from 'express-session';
import passport from 'passport';
import { module } from '../../core/module';
import { createUser } from '../../models/user';
import { UserStore } from '../../db/user-store';
import { isActive, activate } from './activation';
import configurePassport from './configs/passport.config';
import { authenticated } from './middleware/authenticated';
import AuthController from './controllers/auth.controller';
import api from './api';
import { Permissions } from './models/permissions';

function configureExpress(app) {
    app.use(session({
        secret: 'i need more beers',
        resave: false,
        saveUninitialized: false,
    }));

    // Passport:
    app.use(passport.initialize());
    app.use(passport.session());
}

function installControllers(app, strategy) {
    const authController =  new AuthController(strategy);
    app.post('/login', authController.login);
    app.post('/register', authController.register);
    app.get('/logout', authController.logout);
}

function installApi(app, config, db) {
    app.use('/api', authenticated(), api({ config, db }));
}

function createUsers() {
    return UserStore.saveUser(createUser('admin', 'admin', [Permissions.SHOW_USER]))
}

function securityModule({app, config, db}, done) {
    if (isActive()) {
        return;
    }
    activate();

    const securityConfig = config.get('security');
    const strategy = securityConfig.strategy;

    configureExpress(app);
    configurePassport(strategy);
    installControllers(app, strategy);
    installApi(app, config, db);

    createUsers().then(() => done());
}

export default module('security', securityModule);
