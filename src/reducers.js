import { 
    SET_CATEGORIES, 
    SET_CATEGORY, 
    TEST,
    HANDLE_CARD_INPUT_CHANGE
 } from "./actions/types";
import { bindActionCreators } from "redux";

const initialState = {
    categories: [],
    category: {
        cards: []
    }
}

const rootReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case TEST: 
            return {...prevState, message: action.payload};
        case SET_CATEGORIES: 
            return {...prevState, categories: action.payload};
        case SET_CATEGORY:
            return {...prevState, category: action.category};
        case HANDLE_CARD_INPUT_CHANGE:
            return {
                category: {
                  ...prevState.category,
                  cards: [
                    ...prevState.category.cards.slice(0, action.idx),
                    {
                      ...prevState.category.cards[action.idx],
                      [action.name]: action.value
                    },
                    ...prevState.category.cards.slice(action.idx+1)
                  ]
                }
              };
        default: 
            return prevState
    }
}

export default rootReducer;