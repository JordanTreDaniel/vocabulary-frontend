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
} from "./actions/types";
import { fetchCategory } from "./actions/actions";
import Category from './models/Category'
import Term from "./models/Term";

const initialState = {
    categories: [new Category()],
    selectedCategoryIndex: 0,
    loading: false,
    errors: []
}
const getIndexFromId = (array, id) => {
    const idx = array.map((c) => c.id).indexOf(id);
    return idx > 0 ? idx : 0;
}
const insertUpdatedCategory = (categories, newCategory) => {
    const idx = getIndexFromId(categories, newCategory.id)
    categories.splice(idx, 1, newCategory);
    return categories;
}
const removeCardById = (category, id) => {
    let cards = category.cards;
    cards.splice(getIndexFromId(cards, id), 1)
    category.cards = cards;
    return category;
}
const removeCategoryById = (categories, id) => {
    categories.splice(getIndexFromId(categories, id), 1)
    return categories
}
const rootReducer = (prevState = initialState, action) => {
    let newCategory,
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

export default rootReducer;