import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import DropDownList from '../../components/DropDownList/DropDownList';
import { config } from '../../config/app';
import useCharacters from '../../hooks/useCharacters';
import classes from './AutocompleteInput.module.scss';

interface Props {
  id: string;
  label: string;
}

const MIN_CHARACTERS = 3;

const AutocompleteInput: FC<Props> = ({ id, label }) => {
  const [isDropdownListVisible, setIsDropdownListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, characters, setCharacters] = useCharacters(config, searchQuery, MIN_CHARACTERS);

  const handleInputFocus = () => setIsDropdownListVisible(true);

  const handleInputBlur = () => setIsDropdownListVisible(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    console.log(e);
  };

  const handleClear = () => {
    setSearchQuery('');
    setCharacters([]);
  };

  return (
    <div className={classes['autocomplete-input']}>
      <label htmlFor={id} className={classes['autocomplete-input__label']}>
        {label}
      </label>
      <div className={classes['autocomplete-input__input-container']}>
        <input
          type="text"
          name=""
          id={id}
          className={classes['autocomplete-input__input']}
          value={searchQuery}
          placeholder={`Enter minimum ${MIN_CHARACTERS} characters`}
          autoComplete="off"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
        {isDropdownListVisible && searchQuery.length >= MIN_CHARACTERS && (
          <DropDownList data={characters} loading={isLoading} onClick={handleClick} />
        )}
      </div>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};
export default AutocompleteInput;
