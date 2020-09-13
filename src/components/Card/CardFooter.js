import React, { Component } from 'react';
import Button from '../Button';
import styles from './Card.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tournamentActions from '../../actions/tournaments';

class CardFooter extends Component {
  editTournament = id => {
    const newTournamentName = prompt('New Tournament Name:', this.props.name);
    if (newTournamentName && newTournamentName.trim())
      this.props.actions.editTournament(id, newTournamentName);
  };

  deleteTournament = id => {
    const deleteTournament = window.confirm(
      'Do you really want to delete this tournament?'
    );
    if (deleteTournament) this.props.actions.deleteTournament(id);
  };

  render() {
    return (
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.editButton}
          onClick={() => this.editTournament(this.props.id)}
        >
          Edit
        </Button>
        <Button onClick={() => this.deleteTournament(this.props.id)}>
          Delete
        </Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, tournamentActions), dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CardFooter);
