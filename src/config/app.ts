interface Endpoints {
  characters: string;
}

export interface Config {
  baseURL: string;
  endpoints: Endpoints;
}

export const config: Config = {
  baseURL: 'https://www.breakingbadapi.com/api/',
  endpoints: {
    characters: 'characters'
  }
};
