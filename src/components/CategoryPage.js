import React from 'react';
import CategoryItem from './CategoryItem';
import CategoryList from './CategoryList';

class CategoryPage extends React.Component {
    render() {
        let catItemsArr = this.props.categories.map((category, idx) => {
            return <CategoryItem category={category} key={idx}/>
        })
        return <CategoryList categories={catItemsArr}>{catItemsArr}</CategoryList>
    }

    componentDidMount() {
        this.props.fetchCategories();
    }
   
}
export default CategoryPage;