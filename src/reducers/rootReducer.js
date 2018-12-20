
import { combineReducers } from 'redux';
import categoriesAndTermsReducer from './categoriesAndTermsReducer';


const rootReducer = combineReducers({ categoriesAndTerms: categoriesAndTermsReducer })


export default rootReducer;