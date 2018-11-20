import {
    TEST,
    SET_CATEGORIES,
    SET_CATEGORY,
    HANDLE_CARD_FIELD_CHANGE,
    HANDLE_CATEGORY_FIELD_CHANGE,
    UPDATE_CATEGORY
} from './types';
const LOCAL = `http://localhost:3000/api/v1`


export const fetchCategories = () => {
    return (dispatch) => {
        fetch(`${LOCAL}/categories`)
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
    let category = categories[0];
    if (!category.cards) {
        category = {...category, cards: []}
    }
    return {type: SET_CATEGORIES, categories, category}
}
export const fetchCategory = (id) => {
    return (dispatch) => {
        fetch(`${LOCAL}/categories/${id}`)
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
    return {type: SET_CATEGORY, category: categoryObj}
}

export const updateCategory = (category) => {
    return (dispatch) => {
        fetch(`${LOCAL}/categories/${category.id}`, {
            method: "PATCH",
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(category => {
                dispatch(setCategory(category))
            })
            .catch(err => {
            debugger;
        })
    }
}


export const handleCardFieldChange = (name, value, idx) => {
    return {type: HANDLE_CARD_FIELD_CHANGE, name, value, idx}
}

export const handleCategoryFieldChange = (name, value) => {
    return {type: HANDLE_CATEGORY_FIELD_CHANGE, name, value}
}