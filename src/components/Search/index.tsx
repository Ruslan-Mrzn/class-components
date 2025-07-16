import React from 'react';
import styles from './Search.module.scss';
import { Pokemon } from '../../App';

interface SearchProps {
  previousSearchValue: string;
  setSearchValue: (value: string) => void;
  setSearchResults: (result: Pokemon[]) => void;
  fetchPokes: (url: string) => Promise<Pokemon>;
  setSearchError: (error: string | null) => void;
}

interface SearchState {
  searchValue: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    this.props.setSearchError(null);
    e.preventDefault();
    this.props.setSearchValue(this.state.searchValue);
    const result = await this.props.fetchPokes(
      `https://pokeapi.co/api/v2/pokemon/${this.state.searchValue}/?limit=5&offset=0`
    );
    this.props.setSearchResults([result]);
  };
  render() {
    return (
      <form className={styles.search} onSubmit={this.handleSearch}>
        <input
          type="text"
          className={styles.input}
          placeholder="Type poke name"
          defaultValue={this.props.previousSearchValue}
          onChange={this.handleChange}
          required={true}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    );
  }
}
