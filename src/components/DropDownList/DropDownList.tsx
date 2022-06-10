import { FC, MouseEvent } from 'react';
import { Character } from '../../types/api';
import classes from './DropDownList.module.scss';

interface Props {
  data: Character[];
  loading: boolean;
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
}

const DropDownList: FC<Props> = ({ data, loading, onClick }) => {
  return (
    <ul className={classes['dropdown-list']}>
      {loading ? (
        <li className={classes['dropdown-list__item']}>Loading...</li>
      ) : data.length === 0 ? (
        <li className={classes['dropdown-list__item']}>No data</li>
      ) : (
        data.map((char) => (
          <li key={char.char_id} onClick={onClick} className={classes['dropdown-list__item']}>
            {char.name}
          </li>
        ))
      )}
    </ul>
  );
};

export default DropDownList;
