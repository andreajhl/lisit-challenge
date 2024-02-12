export const formatPeopleData = (data) => ({
  title: data.name,
  subtitle: data.birth_year,
  characteristics: {
    height: data.height, 
    mass: data.mass, 
    hair: data.hair_color, 
    skin: data.skin_color, 
    eye: data.eye_color, 
    vehicles: data.vehicles.length,
  },
  additionalInformation: {
    films: data.films,
    starships: data.starships,    
  },
});

export const formatPlanetsData = (data) => ({
  title: data.name,
  subtitle: data.climate,
  characteristics: {
    diameter: data.diameter, 
    gravity: data.gravity, 
    terrain: data.terrain, 
    surfaceWater: data.surface_water,
    population: data.population, 
  },
  additionalInformation: {
    films: data.films,
    residents: data.residents,
  },
});

export const formatStarshipsData = (data) => ({
  title: data.name,
  subtitle: data.model,
  characteristics: {
    length: data.length,
    atmosphereSpeed: data.max_atmosphering_speed,
    hyperdriveRating: data.hyperdrive_rating,
    manufacturer: data.manufacturer, 
    costCredits: data.cost_in_credits, 
    cargoCapacity: data.cargo_capacity, 
    passengers: data.passengers, 
    consumables: data.consumables,
    class: data.starship_class, 
  },
  additionalInformation: {
    films: data.films,
    pilots: data.pilots,
  },
});

export const formatFilmsData = (data) => ({
  title: data.title,
  subtitle: data.director,
  characteristics: {
    producer: data.producer,
    premiere: data.releaseDate,
    episode: data.episodeId,
    description: data.openingCrawl,
  },
});
