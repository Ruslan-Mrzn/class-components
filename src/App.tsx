import './App.module.scss';
import { Search } from './components/Search';
import styles from './App.module.scss';
import React from 'react';
import { fetchPokes } from './utils/fetchPokes';

interface AppState {
  previousSearchValue: string;
  searchResults: unknown[];
  searchError: unknown;
}

export class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      previousSearchValue: localStorage.getItem('previousSearchValue') || '',
      searchResults: [],
      searchError: '',
    };
  }
  setSearchValue = (value: string): void => {
    this.setState({ previousSearchValue: value });
    localStorage.setItem('previousSearchValue', value);
    console.log(value);
  };
  setSearchResults = (result: unknown[]): void => {
    this.setState({ searchResults: result });
  };

  setSearchError = (err: unknown): void => {
    this.setState({ searchError: err });
  };
  async componentDidMount(): Promise<void> {
    let result = await fetchPokes(
      `https://pokeapi.co/api/v2/pokemon/${this.state.previousSearchValue ? this.state.previousSearchValue + '/?limit=5&offset=0' : '?limit=5&offset=0'}`
    );
    if (result.results?.length > 1) {
      result = await Promise.all(
        result.results.map(
          async (item: { url: string }) => await fetchPokes(item.url)
        )
      );
    }
    this.setSearchResults(result);
    console.log(this.state.searchResults);
  }

  render() {
    return (
      <div className={styles.app}>
        <Search
          setSearchValue={this.setSearchValue}
          previousSearchValue={this.state.previousSearchValue}
          setSearchResults={this.setSearchResults}
          setSearchError={this.setSearchError}
        />
      </div>
    );
  }
}
