import * as types from './types';
import * as tournamentApi from '../api/tournamentApi';
import { escapeSpecialCharacters } from '../utils/regexFunctions';

export function getTournaments() {
  return function(dispatch) {
    return tournamentApi
      .getTournaments()
      .then(response => {
        let activeTournaments = response.data;
        dispatch({ type: types.LOAD_TOURNAMENTS_SUCCESS, activeTournaments });
      })
      .catch(error => {
        dispatch({ type: types.LOAD_TOURNAMENTS_FAIL, error });
      });
  };
}

export function editTournament(id, name) {
  return function(dispatch) {
    return tournamentApi.editTournament(id, name).then(() => {
      dispatch({ type: types.EDIT_TOURNAMENT, id, name });
    });
  };
}

export function deleteTournament(id) {
  return function(dispatch) {
    return tournamentApi.deleteTournament(id).then(() => {
      dispatch({ type: types.DELETE_TOURNAMENT, id });
    });
  };
}

export function createNewTournament(name) {
  return function(dispatch) {
    return tournamentApi.createNewTournament(name).then(response => {
      let newTournament = response.data;
      dispatch({ type: types.CREATE_NEW_TOURNAMENT, newTournament });
    });
  };
}

export function loadFilteredTournaments(searchValue) {
  return function(dispatch) {
    return tournamentApi
      .getTournaments()
      .then(response => {
        let tournaments = response.data;
        let escapedRegex = escapeSpecialCharacters(searchValue);
        let filteredTournaments = tournaments.filter(tournament =>
          tournament.name.toLowerCase().match(escapedRegex.toLowerCase().trim())
        );
        dispatch({
          type: types.LOAD_FILTERED_TOURNAMENTS_SUCCESS,
          filteredTournaments
        });
      })
      .catch(error => {
        dispatch({ type: types.LOAD_TOURNAMENTS_FAIL, error });
      });
  };
}
