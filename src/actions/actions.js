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
    DELETE_CARD,
    CATEGORIES_ARE_LOADING,
    ADD_ERROR,
    SET_CURRENT_USER,
    SIGN_OUT
} from './types';
import Category from '../models/Category'
const HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
//helper method to log error to console and add it to state
const addError = (response, dispatch) => {
    console.log(response.error) //do not delete.
    dispatch({ type: ADD_ERROR, response })
    return response;
}
export const signInUser = (gitHubCode) => {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/signInUser`, {
            headers: {
                ...HEADERS
            },
            method: "POST",
            body: JSON.stringify({ code: gitHubCode })
        })
            .then(response => response.json())
            .then(user => {
                dispatch({ type: SET_CURRENT_USER, user })
            })
    }
}
export const signOut = () => {
    return { type: SIGN_OUT }
}
export const getUserFromId = (id) => {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
            .then(res => res.json())
            .then(user => {
                dispatch({ type: SET_CURRENT_USER, user })
            })
    }
}
export const categoriesAreLoading = () => {
    return { type: CATEGORIES_ARE_LOADING }
}
export const deleteCard = (id) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                ...HEADERS
            }
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) {
                    dispatch({ type: DELETE_CARD, response, id })
                } else {
                    return addError(response, dispatch);
                }
            })
    }
}
export const setCategories = (categories) => {
    return { type: SET_CATEGORIES, categories }
}
export const fetchCategories = () => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/categories`)
            .then(response => response.json())
            .then(response => {
                if (!response.error) {
                    response.sort((a, b) => {
                        return a.id - b.id
                    });
                    dispatch(setCategories(response))
                } else {
                    return addError(response, dispatch);
                }
            })
    }
}
export const setCategory = (categoryObj) => {
    return { type: SET_CATEGORY, category: categoryObj }
}
export const fetchCategory = (id) => {
    return (dispatch) => {
        if (isNaN(id)) {
            dispatch(setCategory(new Category()))
        } else {
            return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`)
                .then(response => response.json())
                .then(response => {
                    if (!response.error) {
                        dispatch(setCategory(response));
                    } else {
                        return addError(response, dispatch);
                    }
                })
        }
    }
}

export const createCategory = () => {
    const category = new Category();
    return { type: ADD_CATEGORY, category }
}
export const saveNewCategory = (category) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/categories`, {
            method: "POST",
            body: JSON.stringify(category),
            headers: HEADERS
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) {
                    dispatch({ type: UPDATE_CATEGORY, category: response });
                } else {
                    return addError(response, dispatch);
                }
            })
    }
}
export const deleteCategory = (id) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
            method: 'DELETE',
            ...HEADERS
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) {
                    dispatch({ type: DELETE_CATEGORY, id, response });
                } else {
                    return addError(response, dispatch);
                }
            })
    }
}


export const updateCategory = (category) => {
    return (dispatch) => {
        return fetch(`${process.env.REACT_APP_API_URL}/categories/${category.id}`, {
            method: "PATCH",
            body: JSON.stringify(category),
            headers: HEADERS
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) {
                    dispatch({ type: UPDATE_CATEGORY, category: response })
                } else {
                    return addError(response, dispatch);
                }
            })

    }
}
export const addCard = () => {
    return { type: ADD_CARD }
}
export const selectCategory = (idx) => {
    return (dispatch) => {
        const promise = new Promise(function (resolve, reject) {
            dispatch({ type: SELECT_CATEGORY, idx })
            resolve("success")
        });

        return promise.then(response => {
            return response;
        });

    }

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