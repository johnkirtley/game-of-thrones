export const formatSeasons = (episodes) => {
    const seasons = {};

    episodes.forEach(e => {
        if (!seasons.hasOwnProperty(`Season ${e.season}`)) {
            seasons[`Season ${e.season}`] = [];
        }
        seasons[`Season ${e.season}`].push(e);
    });
    console.log(seasons);
    return seasons;
};