import { matchNumber } from "../../utils/regex";

export const formatFilmsDetail = async (data) => ({
  title: data.title, 
  espisodeId: data.episode_id, 
  openingCrawl: data.opening_crawl, 
  director: data.director, 
  producer: data.producer, 
  releaseDate: data.release_date, 
});

export const formatPeopleDetail =  async (data, films, starships) => {
  const filmsFormatted = films.map(({ title, url }) => (
    ({ name: title, id: matchNumber(url) }))
  );
  const starshipsFormatted = starships.map(({ name, url }) => (
    ({ name, id: matchNumber(url) }))
  );

  return {
    ...data,
    films: filmsFormatted,
    starships: starshipsFormatted,
  };
};

export const formatPlanetsDetail =  async (data, films, residents) => {
  const filmsFormatted = films.map(({ title, url }) =>
    ({ name: title, id: matchNumber(url) }));
  const residentsFormatted = residents.map(({ name, url }) =>
    ({ name, id: matchNumber(url) }));

  return {
    ...data,
    films: filmsFormatted,
    residents: residentsFormatted,
  };
};

export const formatStarshipDetail =  async (data, films, pilots) => {
  const filmsFormatted = films.map(({ title, url }) =>
    ({ name: title, id: matchNumber(url) }));
  const pilotsFormatted = pilots.map(({ name, url }) =>
    ({ name, id: matchNumber(url) }));

  return {
    ...data,
    films: filmsFormatted,
    pilots: pilotsFormatted,
  }
};
