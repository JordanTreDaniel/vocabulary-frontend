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
    DELETE_CARD
} from "./actions/types";
import { fetchCategory } from "./actions/actions";

const initialState = {
    categories: [{
        cards: []
    }],
    selectedCategoryIndex: 0
}
const getIndexFromId = (array, id) => {
    return array.map((c) => c.id).indexOf(id);
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
    debugger
    switch (action.type) {
        case TEST:
            return { ...prevState, message: action.payload };
        case SET_CATEGORIES:
            let { categories, selectedCategoryIndex } = action
            return { ...prevState, categories, selectedCategoryIndex };
        case SET_CATEGORY:
            return {
                ...prevState,
                selectedCategoryIndex: getIndexFromId(prevState.categories, action.category.id),
                categories: prevState.categories
            };
        case SELECT_CATEGORY:
            console.log("Selected Category:", prevState.categories[action.idx])
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
            debugger
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
            c.cards.push({
                term: "New Term",
                def: "Defintion: (Don't use the term in the definition)",
                desc: "Give more context"
            })
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
            debugger
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