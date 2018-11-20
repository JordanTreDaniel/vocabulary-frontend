import { 
    SET_CATEGORIES, 
    SET_CATEGORY, 
    TEST,
    HANDLE_CARD_FIELD_CHANGE,
    HANDLE_CATEGORY_FIELD_CHANGE,
    UPDATE_CATEGORY
 } from "./actions/types";
import { bindActionCreators } from "redux";
import { updateCategory } from "./actions/actions";

const initialState = {
    categories: [],
    category: {
        cards: []
    }
}
const insertNewCategory = (categories, newCategory) => {
    const idx = categories.map((c) => c.id ).indexOf(newCategory.id);
    categories.splice(idx, 1, newCategory);
    return categories;
}
const rootReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case TEST: 
            return {...prevState, message: action.payload};
        case SET_CATEGORIES: 
            let {categories, category } = action
            return {...prevState, categories, category};
        case SET_CATEGORY:
            return {...prevState, 
                        category: action.category, 
                        categories: insertNewCategory(prevState.categories, action.category)
                    };
        case HANDLE_CARD_FIELD_CHANGE:
            return {
                ...prevState,
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
        case HANDLE_CATEGORY_FIELD_CHANGE:
            return {
                ...prevState,
                category: {
                  ...prevState.category,
                  [action.name]: action.value
                }
            }
        case UPDATE_CATEGORY:
            let cats = prevState.categories;
            let oldCategory = cats.find((cat) => {
                return cat.id === prevState.category.id;
            })
            cats[cats.indexOf(oldCategory)] = prevState.category;
            return {
                ...prevState,
                categories: cats
            }
        default: 
            return prevState
    }
}

export default rootReducer;