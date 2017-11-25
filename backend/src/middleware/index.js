import { Router } from 'express';
import { withTemplateEngine } from './withTemplateEngine';

export {
	withTemplateEngine,
}

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here

	return routes;
}
