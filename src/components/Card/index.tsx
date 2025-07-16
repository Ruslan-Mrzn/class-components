import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  img: string;
  name: string;
}

export class Card extends React.Component<CardProps> {
  render() {
    return (
      <li className={styles.card}>
        <img
          src={this.props.img}
          className={styles.img}
          alt={this.props.name}
        />
        <h1 className={styles.name}>{this.props.name}</h1>
      </li>
    );
  }
}
