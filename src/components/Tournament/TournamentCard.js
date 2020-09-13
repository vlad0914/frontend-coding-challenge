import React, { Component } from 'react';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import CardFooter from '../Card/CardFooter';
import './TournamentCard.css';

class TournamentCard extends Component {
  render() {
    return (
      <div className={'TournamentCard'}>
        <CardHeader name={this.props.tournamentInfo.name} />
        <CardBody details={this.props.tournamentInfo} />
        <CardFooter
          id={this.props.tournamentInfo.id}
          name={this.props.tournamentInfo.name}
        />
      </div>
    );
  }
}

export default TournamentCard;
