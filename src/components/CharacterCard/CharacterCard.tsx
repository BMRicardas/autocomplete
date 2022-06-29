import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { Character } from '../../types/api';
import { config } from '../../config/app';
import classes from './CharacterCard.module.scss';

interface Props {
  id: string;
}

const CharacterCard: FC<Props> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Character | null>(null);

  useEffect(() => {
    const getCharacters = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Character[]>(
          config.endpoints.character.replace(':id', id),
          {
            baseURL: config.baseURL
          }
        );
        setData(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch chracter's data", error);
      } finally {
        setIsLoading(false);
      }
    };
    getCharacters();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={classes['character-card']}>
      <div className={classes['character-card__image-container']}>
        <img src={data.img} alt={data.name} className={classes['character-card__image']} />
      </div>
      <h2 className={classes['character-card__title']}>{data.name}</h2>
      <div className={classes['character-card__info']}>
        <p>Birthday: {data.birthday} </p>
        Ocupation:
        <ul>
          {data.occupation.map((ocupation, index) => {
            return <li key={index}>{ocupation}</li>;
          })}
        </ul>
        <p>Nickname: {data.nickname}</p>
        <p>Status: {data.status}</p>
        <p>
          Portrayed by{' '}
          <a
            href={`https://www.google.com/search?q=${data.portrayed.replaceAll(' ', '+')}`}
            target="_blank"
            rel="noopener noreferrer">
            {data.portrayed}
          </a>
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
