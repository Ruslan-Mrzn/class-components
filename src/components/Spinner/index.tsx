import React from 'react';
import styles from './Spinner.module.scss';

export class Spinner extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
}
