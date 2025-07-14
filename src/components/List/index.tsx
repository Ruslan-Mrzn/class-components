import React from 'react';
import styles from './List.module.scss';
import { Pokemon } from '../../utils/fetchPokes';
import { Card } from '../Card';

interface ListProps {
  searchResults: Pokemon[];
  searchError: { message: string };
}

export class List extends React.Component<ListProps> {
  render() {
    if (this.props.searchError.message !== '') {
      return <p>{this.props.searchError.message}</p>;
    }

    return (
      <ul className={styles.list}>
        {this.props.searchResults.map((item: Pokemon) => (
          <Card
            key={item.id}
            img={item.sprites.front_default}
            name={item.name}
          />
        ))}
      </ul>
    );
  }
}
