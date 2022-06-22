import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import DropdownList from '../../components/DropdownList/DropdownList';
import { config } from '../../config/app';
import useCharacters from '../../hooks/useCharacters';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Character } from '../../types/api';
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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputFocus = () => setIsDropdownListVisible(true);

  const handleClose = () => setIsDropdownListVisible(false);

  const onKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (key === 'Escape') {
      handleClose();
    }
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value);
  };

  const handleClick = ({ char_id }: Character) => {
    console.log(char_id);
  };

  const handleClear = () => {
    setSearchQuery('');
    setCharacters([]);
  };

  useOnClickOutside(containerRef, handleClose);

  return (
    <div className={classes['autocomplete-input']}>
      <label htmlFor={id} className={classes['autocomplete-input__label']}>
        {label}
      </label>
      <div
        className={classes['autocomplete-input__input-container']}
        ref={containerRef}
        onKeyDown={onKeyDown}>
        <input
          type="text"
          name=""
          id={id}
          className={classes['autocomplete-input__input']}
          value={searchQuery}
          placeholder={`Enter minimum ${MIN_CHARACTERS} characters`}
          autoComplete="off"
          onClick={handleInputFocus}
          onChange={handleInputChange}
        />
        {isDropdownListVisible && searchQuery.length >= MIN_CHARACTERS && (
          <DropdownList
            data={characters}
            loading={isLoading}
            onClick={(character) => handleClick(character)}
          />
        )}
      </div>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};
export default AutocompleteInput;
