import { useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from '../types/api';
import { Config } from '../config/app';

const useCharacters = (config: Config, inputValue: string, minCharacters: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Character[]>([]);

  useEffect(() => {
    const getCharacters = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Character[]>(config.endpoints.characters, {
          baseURL: config.baseURL,
          params: {
            name: inputValue
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch chracters data', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (inputValue.length >= minCharacters) {
      getCharacters();
    } else {
      setData([]);
    }
  }, [config.baseURL, config.endpoints.characters, inputValue, minCharacters]);

  return [isLoading, data, setData] as const;
};

export default useCharacters;
