import React, { Component } from 'react';
import Input from '../Input';
import Button from '../Button';
import TournamentCard from './TournamentCard';
import InformationalMessage from '../InformationalMessage';
import Retry from '../Retry';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as tournamentActions from '../../actions/tournaments';
import styles from './TournamentView.module.css';

class TournamentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTournaments: this.props.tournamentsStore.tournaments,
      isLoading: false,
      searchValue: ''
    };
    this.reloadData = this.reloadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.setState({ isLoading: true });
    await this.props.actions.getTournaments();
    await this.setState({ isLoading: false });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.tournamentsStore.tournaments !==
      this.props.tournamentsStore.tournaments
    ) {
      this.setState({
        activeTournaments: nextProps.tournamentsStore.tournaments
      });
    }
  }

  reloadData() {
    this.componentDidMount();
  }

  createNewTournament = () => {
    let newTournamentName = prompt('Tournament Name:');
    if (newTournamentName && newTournamentName.trim())
      this.props.actions.createNewTournament(newTournamentName);
  };

  async handleChange(e) {
    e.preventDefault();
    await this.setState({ searchValue: e.target.value });
    await this.setState({ isLoading: true });
    await this.props.actions.loadFilteredTournaments(this.state.searchValue);
    await this.setState({ isLoading: false });
  }

  render() {
    const { activeTournaments, isLoading, searchValue } = this.state;

    if (isLoading)
      return <InformationalMessage>Loading...</InformationalMessage>;
    if (this.props.tournamentsStore.hasFailedToLoad)
      return <Retry reload={this.reloadData} />;

    return (
      <div>
        <div className={`row ${styles.rowContainer}`}>
          <div className={'col-md-4'}>
            <Input
              placeholder={'Search tournament ...'}
              value={searchValue}
              autoFocus
              onChange={this.handleChange}
            />
          </div>
          <div className={'col-md-4'}></div>
          <div className={'col-md-4'}>
            <Button
              className={styles.createNewTournamentButton}
              onClick={this.createNewTournament}
            >
              Create new tournament
            </Button>
          </div>
        </div>
        {activeTournaments ? (
          activeTournaments.map(tournament => {
            return (
              <TournamentCard
                onClick={() => this.focusTextInput()}
                tournamentInfo={tournament}
                key={tournament.id}
              />
            );
          })
        ) : (
          <p>There are no active tournaments</p>
        )}
        {this.props.tournamentsStore.unmatchedSearchFilter ? (
          <InformationalMessage>
            There are no active tournaments matching your criteria
          </InformationalMessage>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    tournamentsStore: store.tournaments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, tournamentActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentView);
