import {
    SET_CURRENT_USER
} from '../actions/types'
const initialState = {
    admin: false,
    username: "Guest",
    avatar_url: "http://cameronmcefee.com/img/work/the-octocat/ironcat.jpg",
    id: null
}
const usersReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            localStorage.setItem("userId", action.user.id)
            return action.user
        default:
            return prevState;
    }
}

export default usersReducer;