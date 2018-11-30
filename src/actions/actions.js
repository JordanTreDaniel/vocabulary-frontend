import {
    SET_CATEGORIES,
    SET_CATEGORY,
    HANDLE_CARD_FIELD_CHANGE,
    HANDLE_CATEGORY_FIELD_CHANGE,
    UPDATE_CATEGORY,
    SELECT_CATEGORY,
    ADD_CARD
} from './types';


export const fetchCategories = () => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_URL}/categories`)
            .then(res => res.json())
            .then(res => {
                res.sort((a, b) => {
                    return a.id - b.id
                });
                dispatch(setCategories(res))
            })
            .catch(err => {
                throw err;
            })
    }
}
export const setCategories = (categories) => {
    let category = categories[0]
    if (!category.cards) {
        category = { ...category, cards: [] }
    }
    return { type: SET_CATEGORIES, categories, selectedCategoryIndex: 0 }
}
export const fetchCategory = (id) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`)
            .then(res => res.json())
            .then(res => {
                dispatch(setCategory(res));
            })
            .catch(err => {
                throw err;
            })
    }
}

export const setCategory = (categoryObj) => {
    return { type: SET_CATEGORY, category: categoryObj }
}

export const updateCategory = (category) => {
    return (dispatch) => {
        fetch(`${process.env.REACT_APP_API_URL}/categories/${category.id}`, {
            method: "PATCH",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(category => {
                dispatch({ type: UPDATE_CATEGORY, category })
            })
            .catch(err => {
                console.log(err)
            })
    }
}
export const addCard = () => {
    return { type: ADD_CARD }
}
export const selectCategory = (idx) => {
    return { type: SELECT_CATEGORY, idx }
}
export const handleCardFieldChange = (name, value, idx) => {
    return { type: HANDLE_CARD_FIELD_CHANGE, name, value, idx }
}
export const handleCategoryFieldChange = (name, value) => {
    return { type: HANDLE_CATEGORY_FIELD_CHANGE, name, value }
}