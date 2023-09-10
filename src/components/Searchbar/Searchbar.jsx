import { useEffect, useState } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  Searchbar,
} from './Searchbar_styled';
import { HiSearch } from 'react-icons/hi';

export const SearchBar = ({onSubmit}) => {
  const [query, setQuery] = useState('');

    const handlerRequest = evt => {
      evt.preventDefault();
      if (!query) {
        return;
        }
        
    onSubmit(query)
    };

  const handleChange = evt => {
      setQuery(evt.target.value.trim())
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handlerRequest}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>
            <HiSearch style={{ width: 20, height: 20 }} />
          </SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Searchbar>
  );
}