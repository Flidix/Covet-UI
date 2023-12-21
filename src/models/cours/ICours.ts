import {IUser} from "../user/IUser";
import {IRating} from "./IRating";
import {IVideo} from "./IVideo";
import {ICoursToCategory} from "./ICoursToCategory";

export interface ICours {

    cours: ICourse

    isBuyed: boolean

}

export interface ICourse {
    id: number
    name: string;
    avatar: string;
    price: number;
    description: string;
    likesCount: number;
    isOficial: boolean;
    stars: number;
    userId: number;

    isBued: boolean;

    user: IUser;

    ratings: IRating[]

    videos: IVideo[]

    coursToCategory: ICoursToCategory[]
}