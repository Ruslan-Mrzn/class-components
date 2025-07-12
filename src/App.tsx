import './App.module.scss';
import { Search } from './components/Search';
import styles from './App.module.scss';
import React from 'react';

interface AppState {
  previousSearchValue: string;
  searchResults: unknown[];
  searchStatus: string;
}

export class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      previousSearchValue: localStorage.getItem('previousSearchValue') || '',
      searchResults: [],
      searchStatus: '',
    };
  }
  setSearchValue = (value: string): void => {
    this.setState({ previousSearchValue: value });
    localStorage.setItem('previousSearchValue', value);
    console.log(value);
  };
  render() {
    return (
      <div className={styles.app}>
        <Search
          setSearchValue={this.setSearchValue}
          previousSearchValue={this.state.previousSearchValue}
        />
      </div>
    );
  }
}
