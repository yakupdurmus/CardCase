import { ALLCARDS, CARD } from '../actions/types';
import { combineReducers } from 'redux';

const INITIAL_STATE = {
    allcards: [],
    card: {}
};
const cardsReducer = (state = INITIAL_STATE, action) => {


    switch (action.type) {
        case ALLCARDS:
            return { ...state, allcards: action.payload };
        case CARD:
            return { ...state, card: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    cards: cardsReducer
});
