import {
    SET_CATEGORIES,
    SET_CATEGORY,
    HANDLE_CARD_FIELD_CHANGE,
    HANDLE_CATEGORY_FIELD_CHANGE,
    UPDATE_CATEGORY,
    SELECT_CATEGORY,
    SELECT_CATEGORY_BY_ID,
    ADD_CARD,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    DELETE_CARD
} from './types';
import Category from '../models/Category'
const HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
export const deleteCard = (id) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/cards/${id}`, {
            method: 'DELETE',
            ...HEADERS
        })
            .then(res => res.json())
            .then(response => {
                dispatch({ type: DELETE_CARD, response, id })
                return response
            })
            .catch(err => {
                throw err;
            })
    }
}
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
export const setCategories = (categories, index = 0) => {
    let category = categories[index]
    if (!category.cards) {
        category = { ...category, cards: [] }
    }
    return { type: SET_CATEGORIES, categories, selectedCategoryIndex: index }
}
export const fetchCategory = (id) => {
    return (dispatch) => {
        if (isNaN(id)) {
            dispatch(setCategory(new Category()))
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`)
                .then(res => res.json())
                .then(category => {
                    dispatch(setCategory(category));
                })
                .catch(err => {
                    throw err;
                })
        }
    }
}
export const createCategory = () => {
    const category = {
        name: "New Category",
        desc: "Description",
        "img_url": "Image URL here",
        cards: [{
            term: "New Term",
            def: "Defintion: (Don't use the term in the definition)",
            desc: "Give more context"
        }]
    }
    return { type: ADD_CATEGORY, category }
}
export const saveNewCategory = (category) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: "POST",
            body: JSON.stringify(category),
            headers: HEADERS
        })
            .then(res => res.json())
            .then(category => {
                dispatch({ type: UPDATE_CATEGORY, category })
                // return category // commenting this out bc i don't think it's needed. might be messing up save functionality
            })
            .catch(err => {
                console.log(err)
            })
    }
}
export const deleteCategory = (id) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
            method: 'DELETE',
            ...HEADERS
        })
            .then(res => res.json())
            .then(response => {
                dispatch({ type: DELETE_CATEGORY, id, response })
            })
    }
}
export const setCategory = (categoryObj) => {
    return { type: SET_CATEGORY, category: categoryObj }
}

export const updateCategory = (category) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/categories/${category.id}`, {
            method: "PATCH",
            body: JSON.stringify(category),
            headers: HEADERS
        })
            .then(res => res.json())
            .then(category => {
                dispatch({ type: UPDATE_CATEGORY, category })
                // return category // commenting this out bc i don't think it's needed. might be messing up save functionality
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
export const selectCategoryById = (id) => {
    return { type: SELECT_CATEGORY_BY_ID, id }
}
export const handleCardFieldChange = (name, value, idx) => {
    return { type: HANDLE_CARD_FIELD_CHANGE, name, value, idx }
}
export const handleCategoryFieldChange = (name, value) => {
    return { type: HANDLE_CATEGORY_FIELD_CHANGE, name, value }
}