import './App.module.scss';
import { Search } from './components/Search';
import styles from './App.module.scss';
import React from 'react';
import { List } from './components/List';
import { Spinner } from './components/Spinner';

export type Pokemon = {
  name: string;
  id: number;
  sprites: { front_default: string };
};
interface AppState {
  previousSearchValue: string;
  searchResults: Pokemon[];
  searchError: null | string;
  isAppCrashed: boolean;
  isLoading: boolean;
}

export class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      previousSearchValue: localStorage.getItem('previousSearchValue') || '',
      searchResults: [],
      searchError: null,
      isAppCrashed: false,
      isLoading: false,
    };
  }

  fetchPokes = async (url: string) => {
    this.setState({ isLoading: true });
    let response;
    try {
      response = await fetch(url);
    } catch (error) {
      this.setState({ isLoading: false });
      this.setSearchError(
        `Error fetching data: ${error}. Please try reload the page.`
      );
      throw new Error('Error fetching data');
    }
    if (!response.ok || !response) {
      if (response.status === 400) {
        this.setSearchError('Bad Request. Please check the name is correct.');
      }
      if (response.status === 404) {
        this.setSearchError(
          'No Pokemon with that name was found. Please check the name is correct.'
        );
      }
      if (response.status === 500) {
        this.setSearchError('Internal Server Error. Please try again later.');
      }
      if (response.status === 503) {
        this.setSearchError('Service Unavailable. Please try again later.');
      } else {
        throw new Error('Error fetching data');
      }
    }
    const data = await response.json();
    return data;
  };

  setSearchValue = (value: string): void => {
    localStorage.setItem('previousSearchValue', value);
    this.setState({ previousSearchValue: value }, () => {
      this.setState({ isLoading: true });
    });
  };
  setSearchResults = (result: Pokemon[]): void => {
    this.setState({ searchResults: result }, () => {
      this.setState({ isLoading: false });
    });
  };

  setSearchError = (message: string | null): void => {
    this.setState({ searchError: message }, () => {
      this.setState({ isLoading: false });
    });
  };

  async componentDidMount(): Promise<void> {
    const result = [];
    let data = null;

    try {
      data = await this.fetchPokes(
        `https://pokeapi.co/api/v2/pokemon/${this.state.previousSearchValue ? this.state.previousSearchValue + '/?limit=5&offset=0' : '?limit=5&offset=0'}`
      );
    } catch (error) {
      throw new Error('Error fetching data' + error);
    }
    if (data.results?.length > 1) {
      for (let i = 0; i < data.results.length; i++) {
        const currentPoke: Pokemon = await this.fetchPokes(data.results[i].url);
        result.push(currentPoke);
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
    } else {
      result.push(data);
    }
    this.setSearchResults(result);
  }
  render() {
    if (this.state.isAppCrashed) {
      throw new Error('App Crashed');
    }
    return (
      <div className={styles.app}>
        <Search
          setSearchValue={this.setSearchValue}
          previousSearchValue={this.state.previousSearchValue}
          setSearchResults={this.setSearchResults}
          setSearchError={this.setSearchError}
          fetchPokes={this.fetchPokes}
        />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <List
            searchResults={this.state.searchResults}
            searchError={this.state.searchError}
          />
        )}

        <button
          className={styles.errorButton}
          onClick={() => {
            this.setState({ isAppCrashed: true });
          }}
        >
          Throw Error
        </button>
      </div>
    );
  }
}
