import axios from 'axios';
import { API_TOURNAMENTS_URL } from '../constants/api';

export function getTournaments() {
  return axios.get(API_TOURNAMENTS_URL);
}

export function editTournament(id, name) {
  const url = API_TOURNAMENTS_URL + `/${id}`;
  return axios.patch(url, {
    name: name
  });
}

export function deleteTournament(id) {
  const url = API_TOURNAMENTS_URL + `/${id}`;
  return axios.delete(url);
}

export function createNewTournament(name) {
  return axios.post(API_TOURNAMENTS_URL, {
    name
  });
}
