interface Endpoints {
  characters: string;
  character: string;
}

export interface Config {
  baseURL: string;
  endpoints: Endpoints;
}

export const config: Config = {
  baseURL: 'https://www.breakingbadapi.com/api/',
  endpoints: {
    characters: 'characters',
    character: 'characters/:id'
  }
};
