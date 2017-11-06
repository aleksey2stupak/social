import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from 'nconf';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import paths from './lib/paths';
import initializeDb from './db';
import middleware from './middleware';
import controllers from './controllers';
import './configs/passport.config';
import api from './api';
import router from './router';

config.argv()
	.env()
	.file({ file: paths.src.resolve('config.json') });

let app = express();
app.server = http.createServer(app);

app.use(express.static(paths.base.resolve('..', 'frontend'), {
    extensions: ['html']
}));

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.get('corsHeaders')
}));

app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'SECRET' }));

// Passport:
app.use(passport.initialize());
app.use(passport.session());

// connect to db
initializeDb( db => {

    controllers({ app});

	// internal middleware
	app.use(middleware({ config, db }));

    // page router
	app.use('/', router({ config, db }));

	// api router
	app.use('/api', api({ config, db }));

	app.server.listen(config.get('port'), () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
