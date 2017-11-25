import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from 'nconf';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import paths from './lib/paths';
import initializeDb from './db';
import middleware from './middleware';
import security from './modules/security';
import hbs from './modules/hbs';
import api from './api';
import router from './router';
import { ModuleLoader } from './core/module-loader';
import { TemplateEngineRegistry } from './core/template-engine-registry';

config.argv()
	.env()
	.file({ file: paths.src.resolve('config.json') });

let app = express();
app.server = http.createServer(app);
app.templateEngineRegistry = new TemplateEngineRegistry();

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.get('corsHeaders')
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', paths.base.resolve('../frontend/views'));

// connect to db
initializeDb( db => {
	const moduleLoader = new ModuleLoader(app, config, db);

	const modules = [security, hbs];

    // initialize security module
	moduleLoader.loadModules(...modules).then(() => {
		// internal middleware
		app.use(middleware({ config, db }));

		// page router
		app.use('/', router({ app, config, db }));

		// api router
		app.use('/api', api({ config, db }));

		app.server.listen(config.get('port'), () => {
			console.log(`Started on port ${app.server.address().port}`);
		});
	});
});

export default app;
