import { SET_CATEGORIES } from "./actions/types";
import { bindActionCreators } from "redux";

const initialState = {
    categories: [],
    cards: [],
}

const rootReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case "TEST": 
            return {...prevState, message: action.payload};
        case "SET_CATEGORIES": 
            return {...prevState, categories: action.payload}
        case "SET_CATEGORY":
            return {...prevState, category: action.category, cards: action.cards}
        default: 
            return prevState
    }
}

export default rootReducer;