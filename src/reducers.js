import {
    SET_CATEGORIES,
    SET_CATEGORY,
    TEST,
    HANDLE_CARD_FIELD_CHANGE,
    HANDLE_CATEGORY_FIELD_CHANGE,
    UPDATE_CATEGORY,
    SELECT_CATEGORY,
    ADD_CARD
} from "./actions/types";

const initialState = {
    categories: [{
        cards: []
    }],
    selectedCategoryIndex: 0
}
const getCategoryIndex = (categories, id) => {
    return categories.map((c) => c.id).indexOf(id);
}
const insertUpdatedCategory = (categories, newCategory) => {
    const idx = getCategoryIndex(categories, newCategory.id)
    categories.splice(idx, 1, newCategory);
    return categories;
}
const rootReducer = (prevState = initialState, action) => {
    let newCategory,
        oldCategory;
    switch (action.type) {
        case TEST:
            return { ...prevState, message: action.payload };
        case SET_CATEGORIES:
            let { categories, selectedCategoryIndex } = action
            return { ...prevState, categories, selectedCategoryIndex };
        case SET_CATEGORY:
            return {
                ...prevState,
                selectedCategoryIndex: getCategoryIndex(prevState.categories, action.category.id),
                categories: insertUpdatedCategory(prevState.categories, action.category)
            };
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
        case UPDATE_CATEGORY:
            return {
                ...prevState,
                categories: insertUpdatedCategory(prevState.categories, action.category)
            }
        case SELECT_CATEGORY:
            return {
                ...prevState,
                selectedCategoryIndex: action.idx
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
        default:
            return prevState
    }
}

export default rootReducer;