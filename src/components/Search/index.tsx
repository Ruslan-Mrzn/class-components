import React from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  previousSearchValue: string;
  setSearchValue: (value: string) => void;
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
  handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.setSearchValue(this.state.searchValue);
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
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    );
  }
}
