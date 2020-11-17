import {AuthorizationStatus} from "../const.js";
import {loadFilms, requireAuthorization} from "./action.js";

export const fetchFilmsList = () => (dispatch, __getState, api) => (
  api.get(`/films`)
      .then(({data}) => dispatch(loadFilms(data)))
);

export const checkAuth = () => (dispatch, __getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, __getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
);

export const logout = () => (dispatch, __getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);
