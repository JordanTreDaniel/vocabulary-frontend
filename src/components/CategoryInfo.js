import React from 'react';
import TermContainer from './TermContainer';

const CategoryInfo = ({ category }) => {
    return (
        <>
            <div
                className="category-info"
                style={{ backgroundImage: `url(${category['img_url']})` }}
            >
                <h1>{category.name}</h1>
                <p>{category.desc}</p>
            </div>
            <TermContainer cards={category.cards} />
        </>
    )
}

export default CategoryInfo;