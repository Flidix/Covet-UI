import {ICours} from "./ICours";
import {ICategory} from "./ICategory";

export interface ICoursToCategory {
    cours: ICours

    coursId: number

    categotyId: number
    category: ICategory
}