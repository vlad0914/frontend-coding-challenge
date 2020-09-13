import * as types from '../actions/types';

const initialState = {
  hasFailedToLoad: false,
  isLoading: false,
  unmatchedSearchFilter: false,
  tournaments: []
};

export default function tournaments(state = initialState, action) {
  let newTournaments;
  switch (action.type) {
    case types.LOAD_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        tournaments: action.activeTournaments,
        hasFailedToLoad: false
      };
    case types.LOAD_TOURNAMENTS_FAIL:
      return { ...state, hasFailedToLoad: true };
    case types.EDIT_TOURNAMENT:
      newTournaments = state.tournaments.map(tournament => {
        if (action.id === tournament.id) {
          tournament.name = action.name;
        }
        return tournament;
      });
      return { ...state, tournaments: newTournaments };
    case types.DELETE_TOURNAMENT:
      newTournaments = state.tournaments.filter(
        tournament => tournament.id !== action.id
      );
      return { ...state, tournaments: newTournaments };
    case types.CREATE_NEW_TOURNAMENT:
      newTournaments = state.tournaments.map(tournament => tournament);
      newTournaments.unshift(action.newTournament);
      return { ...state, tournaments: newTournaments };
    case types.LOAD_FILTERED_TOURNAMENTS_SUCCESS:
      state.isLoading = true;
      if (action.filteredTournaments.length === 0)
        state.unmatchedSearchFilter = true;
      return {
        ...state,
        tournaments: action.filteredTournaments,
        isLoading: false
      };
    default:
      return state;
  }
}
