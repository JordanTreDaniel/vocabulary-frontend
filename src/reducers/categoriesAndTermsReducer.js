import {
    SET_CATEGORIES,
    SET_CATEGORY,
    TEST,
    HANDLE_CARD_FIELD_CHANGE,
    HANDLE_CATEGORY_FIELD_CHANGE,
    UPDATE_CATEGORY,
    SELECT_CATEGORY,
    SELECT_CATEGORY_BY_ID,
    ADD_CARD,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    DELETE_CARD,
    CATEGORIES_ARE_LOADING,
    ADD_ERROR
} from "../actions/types";
import {
    getIndexFromId,
    insertUpdatedCategory,
    removeCardById,
    removeCategoryById,
} from './reducerHelpers';
import { fetchCategory } from "../actions/actions";
import Category from '../models/Category'
import Term from "../models/Term";
const initialState = {
    categories: [new Category()],
    selectedCategoryIndex: 0,
    loading: false,
    errors: []
}
const categoriesAndTermsReducer = (prevState = initialState, action) => {

    let newCategory, //these two variables are used in the onChange methods
        oldCategory;

    switch (action.type) {
        case TEST:
            return { ...prevState, message: action.payload };
        case ADD_ERROR:
            prevState.errors.push(action.response);
            return { ...prevState, errors: prevState.errors, loading: false }
        case CATEGORIES_ARE_LOADING:
            return { ...prevState, loading: true }
        case SET_CATEGORIES:
            let { categories } = action
            return { ...prevState, categories, loading: false };
        case SET_CATEGORY:
            return {
                ...prevState,
                selectedCategoryIndex: getIndexFromId(prevState.categories, action.category.id),
                categories: insertUpdatedCategory(prevState.categories, action.category),
                loading: false
            };
        case SELECT_CATEGORY:
            return {
                ...prevState,
                selectedCategoryIndex: action.idx
            }
        case SELECT_CATEGORY_BY_ID:
            if (prevState.categories[prevState.selectedCategoryIndex].id === undefined) {
                fetchCategory(action.id)
            } else {
                return {
                    ...prevState,
                    selectedCategoryIndex: getIndexFromId(prevState.categories, action.id)
                }
            }
            return prevState;
        case UPDATE_CATEGORY:
            return {
                ...prevState,
                categories: insertUpdatedCategory(prevState.categories, action.category)
            }
        case ADD_CATEGORY:
            prevState.categories.push(action.category)
            return {
                ...prevState,
                selectedCategoryIndex: prevState.categories.length - 1,
                categories: prevState.categories
            }
        case ADD_CARD:
            let c = prevState.categories[prevState.selectedCategoryIndex]
            c.cards.push(new Term());
            return {
                ...prevState,
                categories: insertUpdatedCategory(prevState.categories, c)
            }
        case DELETE_CARD:
            const category = removeCardById(prevState.categories[prevState.selectedCategoryIndex], action.id)
            return {
                ...prevState,
                categories: insertUpdatedCategory(prevState.categories, category)
            }
        case DELETE_CATEGORY:
            return {
                ...prevState,
                categories: removeCategoryById(prevState.categories, action.id),
                selectedCategoryIndex: 0
            }
        case HANDLE_CARD_FIELD_CHANGE:
            oldCategory = { ...prevState.categories[prevState.selectedCategoryIndex] }
            newCategory = {
                ...oldCategory,
                cards: [
                    ...oldCategory.cards.slice(0, action.idx),
                    {
                        ...oldCategory.cards[action.idx],
                        [action.name]: action.value
                    },
                    ...oldCategory.cards.slice(action.idx + 1)
                ]
            }
            return {
                ...prevState,
                categories: insertUpdatedCategory(prevState.categories, newCategory)
            };
        case HANDLE_CATEGORY_FIELD_CHANGE:
            newCategory = {
                ...prevState.categories[prevState.selectedCategoryIndex],
                [action.name]: action.value
            }
            return {
                ...prevState,
                categories: insertUpdatedCategory(prevState.categories, newCategory)
            }
        default:
            return prevState;
    }
}

export default categoriesAndTermsReducer;