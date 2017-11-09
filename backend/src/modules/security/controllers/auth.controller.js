import passport from 'passport';
import { authService } from '../services/auth.service';

const loginHandler = (req, res, next) => err => {
    if (err) {
        next(err);
    } else {
        const redirectTo = req.session.redirectTo || '/feed';
        delete req.session.redirectTo;
        res.redirect(redirectTo);
    }
};

export default class AuthController {

    constructor(strategy) {
        this.strategy = strategy;

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.register = this.register.bind(this);
    }

    // Здесь мы проверяем, передаем данные о пользователе в функцию верификации, котоую мы определили выше.
    // Вообще, passport.authenticate() вызывает метод req.logIn автоматически, здесь же я указал это явно.
    // Это добавляет удобство в отладке. Например, можно вставить сюда console.log(), чтобы посмотреть, что происходит...
    // При удачной авторизации данные пользователя будут храниться в req.user
    login(req, res, next) {
        passport.authenticate(this.strategy,
            function(err, user, info) {
                if (err) {
                    next(err);
                    return;
                }
                if (!user) {
                    res.redirect('/');
                    return;
                }
                console.log(`authenticated user:`);
                console.log(user);
                req.logIn(user, loginHandler(req, res, next));
            }
        )(req, res, next);
    };

    // Здесь все просто =)
    logout(req, res) {
        req.logout();
        res.redirect('/');
    };

    // Регистрация пользователя. Создаем его в базе данных, и тут же, после сохранения, вызываем метод `req.logIn`, авторизуя пользователя
    register(req, res, next) {
        console.log(`Register user request received`);
        authService.registerUser(req.body)
            .then(user => {
                req.logIn(user, loginHandler(req, res, next));
            })
            .catch(err => {
                next(err);
            });
    };

}
