import axios from 'axios';

export const fetchShow = () => {
	return axios
		.get(
			'https://api.tvmaze.com/singlesearch/shows?q=game%20of%20thrones&embed=episodes'
		)
		.then((res) => {
			console.log(res);
			return res;
		})
		.catch((err) => {
			console.log('Fetching API', err);
			return err;
		});
};
