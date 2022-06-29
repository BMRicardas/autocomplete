import { FC } from 'react';
import { Character } from '../../types/api';
import classes from './DropdownList.module.scss';

interface Props {
  data: Character[];
  loading: boolean;
  onClick: (char: Character) => void;
}

const DropdownList: FC<Props> = ({ data, loading, onClick }) => {
  return (
    <ul className={classes['dropdown-list']}>
      {loading ? (
        <li className={classes['dropdown-list__item']}>Loading...</li>
      ) : data.length === 0 ? (
        <li className={classes['dropdown-list__item']}>No data</li>
      ) : (
        data.map((char) => (
          <li
            key={char.char_id}
            onClick={() => onClick(char)}
            className={classes['dropdown-list__item']}>
            {char.name}
          </li>
        ))
      )}
    </ul>
  );
};

export default DropdownList;
