import { UserStore, initUserStore } from "./UserStore";

function initDb() {
	return Promise.all([
		initUserStore(),
	]);
}

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	initDb().then(callback)
}

class DB {

}

export const db = new DB();

export {
	UserStore
};
