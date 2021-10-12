import { ALLCARDS, CARD } from './types';

export const setAllCards = (type) => (dispatch) => {

  dispatch({
    type: ALLCARDS,
    payload: type
  });
};


export const setCard = (type) => (dispatch) => {

  dispatch({
    type: CARD,
    payload: type
  });
};

