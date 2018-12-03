import Term from './Term'
export default class Category {
    constructor(name = "", desc = "", imgUrl = "", id = null) {
        this.name = name;
        this.desc = desc;
        this.imgUrl = imgUrl;
        this.id = id;
        this.cards = [new Term()]
    }
}