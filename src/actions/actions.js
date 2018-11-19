import {
    TEST,
    SET_CATEGORIES,
    SET_CATEGORY,
    HANDLE_CARD_INPUT_CHANGE
} from './types';

export const tester = () => {
    return {type: TEST, payload: "This is a test"}
}

export const setCategories = (categoriesArr) => {
    return {type: SET_CATEGORIES, payload: categoriesArr}
}

export const setCategory = (categoryObj) => {
    return {type: SET_CATEGORY, category: categoryObj}
}

export const handleCardInputChange = (name, value, idx) => {
    return {type: HANDLE_CARD_INPUT_CHANGE, name, value, idx}
}