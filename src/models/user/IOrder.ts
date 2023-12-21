import {ICours} from "../cours/ICours";
import {IUser} from "./IUser";

export interface IOrder {
    price: number;
    isPaid: boolean;
    userId: number;
    courseId: number;
    fromUser: IUser;
    toCours: ICours;
}