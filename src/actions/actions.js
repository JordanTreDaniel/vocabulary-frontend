import {
    TEST,
    SET_CATEGORIES,
    SET_CATEGORY
} from './types';

export const tester = () => {
    return {type: TEST, payload: "This is a test"}
}

export const setCategories = (categoriesArr) => {
    return {type: SET_CATEGORIES, payload: categoriesArr}
}

export const setCategory = (categoryObj, cardsArr) => {
    return {type: SET_CATEGORY, cards: cardsArr, category: categoryObj}
}