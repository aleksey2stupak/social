import session from 'express-session';
import passport from 'passport';
import configurePassport from './configs/passport.config';
import AuthController from './controllers/auth.controller';

let active = false;

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

export default function security({app, config, db}) {
    if (active) {
        return;
    }
    active = true;

    const securityConfig = config.get('security');
    const strategy = securityConfig.strategy;

    configureExpress(app);
    configurePassport(strategy);
    installControllers(app, strategy);
}

export const authenticated = () => (req, res, next) => {
    if (!active) {
        console.log('Security module was not be activated. Authenticated access to route is disabled.');
        next();
    }
    if (!req.isAuthenticated()) {
        console.log(`Private route "${req.path}" is not allowed for not authenticated user`);
        res.redirect('/');
        return;
    }
    console.log('Private route is allowed');
    next();
};
