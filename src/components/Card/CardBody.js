import React from 'react';
import styles from './Card.module.css';

export default function CardBody({ details }) {
  const formatDate = date => {
    return new Date(date).toLocaleString('en-GB');
  };

  return (
    <div className={styles.bodyParagraph}>
      <p>Organizer: {details.organizer}</p>
      <p>Game: {details.game}</p>
      <p>
        Participants: {details.participants.current}/{details.participants.max}
      </p>
      <p>Start: {formatDate(details.startDate)}</p>
    </div>
  );
}
