import React from 'react';

const CategoryInfo = ({ category }) => {
    return (
        <>
            <div
                className="category-info"
            >
                <div className="category-thumbnail" style={{ backgroundImage: `url(${category['img_url']})` }}>
                </div>
                <span>{category.cards.length} cards</span>
                <h1>{category.name}</h1>
                <p>{category.desc}</p>
            </div>
        </>
    )
}

export default CategoryInfo;