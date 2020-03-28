module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './data/users.db3'
		},
		useNullAsDefault: true,
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	},
	testing: {
		client: 'pg',
		connection: 'postgresql://localhost:5432/gameofthrones',
		migrations: {
			directory: './data/migrations'
		},
		seeds: {
			directory: './data/seeds'
		}
	}
};
