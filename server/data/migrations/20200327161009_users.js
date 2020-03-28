exports.up = function(knex) {
	return knex.schema
		.createTable('users', tbl => {
			tbl.increments();

			tbl
				.string('username')
				.unique()
				.notNullable();
			tbl.string('password').notNullable();
		})

		.createTable('watched', tbl => {
			tbl.increments();

			tbl.string('episode_name');
			tbl
				.integer('user_id')
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users').dropTableIfExists('watched');
};
