exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('watched')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('watched').insert([
				{ id: 1, episode_name: 'episode 1', user_id: 1 },
				{ id: 2, episode_name: 'episode 2', user_id: 2 },
				{ id: 3, episode_name: 'episode 3', user_id: 1 },
				{ id: 4, episode_name: 'episode 4', user_id: 2 },
				{ id: 5, episode_name: 'episode 5', user_id: 1 }
			]);
		});
};
