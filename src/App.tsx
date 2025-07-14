import './App.module.scss';
import { Search } from './components/Search';
import styles from './App.module.scss';
import React from 'react';
import { fetchPokes, Pokemon } from './utils/fetchPokes';
import { List } from './components/List';

interface AppState {
  previousSearchValue: string;
  searchResults: Pokemon[];
  searchError: { message: string };
}

export class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      previousSearchValue: localStorage.getItem('previousSearchValue') || '',
      searchResults: [],
      searchError: { message: '' },
    };
  }
  setSearchValue = (value: string): void => {
    localStorage.setItem('previousSearchValue', value);
    this.setState({ previousSearchValue: value });
    console.log(value);
  };
  setSearchResults = (result: Pokemon[]): void => {
    this.setState({ searchResults: result }, () => {
      console.log('setted');
      console.log(this.state.searchResults);
    });
  };

  setSearchError = (err: { message: string }): void => {
    this.setState({ searchError: err });
  };
  async componentDidMount(): Promise<void> {
    const data = await fetchPokes(
      `https://pokeapi.co/api/v2/pokemon/${this.state.previousSearchValue ? this.state.previousSearchValue + '/?limit=5&offset=0' : '?limit=5&offset=0'}`
    );
    console.log('fetched');
    if (data.results?.length > 1) {
      const result = [];
      for (let i = 0; i < data.results.length; i++) {
        const currentPoke: Pokemon = await fetchPokes(data.results[i].url);
        result.push(currentPoke);
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      this.setSearchResults(result);
      console.log('resolved');
    } else {
      this.setSearchResults(data);
    }
  }

  componentDidCatch(error: { message: string }): void {
    this.setSearchError(error);
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
        <List
          searchResults={this.state.searchResults}
          searchError={this.state.searchError}
        />
      </div>
    );
  }
}
