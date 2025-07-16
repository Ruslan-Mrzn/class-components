import React from 'react';
import styles from './List.module.scss';
import { Pokemon } from '../../App';
import { Card } from '../Card';

interface ListProps {
  searchResults: Pokemon[];
  searchError: string | null;
}

export class List extends React.Component<ListProps> {
  render() {
    if (this.props.searchError) {
      return (
        <p className={styles.errorText} data-testid="error">
          {this.props.searchError}
        </p>
      );
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
