import {
    TEST,
    SET_CATEGORIES,
    SET_CATEGORY,
    HANDLE_CARD_FIELD_CHANGE,
    HANDLE_CATEGORY_FIELD_CHANGE
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

export const handleCardFieldChange = (name, value, idx) => {
    return {type: HANDLE_CARD_FIELD_CHANGE, name, value, idx}
}

export const handleCategoryFieldChange = (name, value) => {
    return {type: HANDLE_CATEGORY_FIELD_CHANGE, name, value}
}