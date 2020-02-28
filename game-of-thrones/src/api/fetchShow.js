import axios from 'axios';


export const fetchShow = () => {
    return axios
        .get(
            "http://api.tvmaze.com/singlesearch/shows?q=game-of-thrones&embed=episodes"
        )
        .then(res => {
            console.log(res)
            return res;
        })
        .catch(err => {
            console.log('Fetching API', err);
            return err
        })
};