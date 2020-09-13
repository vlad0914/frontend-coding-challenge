import React from 'react';
import Button from './Button';
import styles from './Retry.module.css';

export default function Retry({ reload }) {
  return (
    <div className={styles.container}>
      Something went wrong.
      <Button className={styles.retryButton} onClick={reload}>
        Retry
      </Button>
    </div>
  );
}
