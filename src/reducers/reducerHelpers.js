export const getIndexFromId = (array, id) => {
    const idx = array.map((c) => c.id).indexOf(id);
    return idx > 0 ? idx : 0;
}
export const insertUpdatedCategory = (categories, newCategory) => {
    const idx = getIndexFromId(categories, newCategory.id)
    categories.splice(idx, 1, newCategory);
    return categories;
}
export const removeCardById = (category, id) => {
    let cards = category.cards;
    cards.splice(getIndexFromId(cards, id), 1)
    category.cards = cards;
    return category;
}
export const removeCategoryById = (categories, id) => {
    categories.splice(getIndexFromId(categories, id), 1)
    return categories
}