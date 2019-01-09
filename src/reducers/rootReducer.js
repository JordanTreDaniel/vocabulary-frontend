
import { combineReducers } from 'redux';
import categoriesAndTermsReducer from './categoriesAndTermsReducer';
import usersReducer from './usersReducer';


const rootReducer = combineReducers({
    categoriesAndTerms: categoriesAndTermsReducer,
    userInfo: usersReducer
})


export default rootReducer;