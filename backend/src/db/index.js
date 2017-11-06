export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	callback();
}

class DB {

}

export const db = new DB();