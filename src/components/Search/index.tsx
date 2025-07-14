import React from 'react';
import styles from './Search.module.scss';
import { fetchPokes } from '../../utils/fetchPokes';

interface SearchProps {
  previousSearchValue: string;
  setSearchValue: (value: string) => void;
  setSearchResults: (result: unknown[]) => void;
  setSearchError: (error: unknown) => void;
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
    console.log(this.state.searchValue);
  };
  handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.props.setSearchValue(this.state.searchValue);
    let result;
    try {
      result = await fetchPokes(
        `https://pokeapi.co/api/v2/pokemon/${this.state.searchValue}/?limit=5&offset=0`
      );
      this.props.setSearchResults(result);
    } catch (err: unknown) {
      this.props.setSearchError(err);
      console.info(err);
    }
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
