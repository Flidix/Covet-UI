    import {ISubscribe} from "./ISubscribe";
    import {ICours} from "../cours/ICours";
    import {ILike} from "./ILike";
    import {IVideo} from "../cours/IVideo";
    import {IListen} from "./IListen";
    import {IBuedCurses} from "./IBuedCurses";
    import {IOrder} from "./IOrder";

    export interface IUser {

        id: number

        createdAt: Date
        updatedAt: Date
        email: string

        userAvatar: string

        username: string

        password: string

        isAdmin: boolean

        isOficial: boolean

        subscribersCount: number

        lastLoginAt: Date

        subscription: ISubscribe[]

        subscribers: ISubscribe[]

        courses: ICours[]

        likes: ILike[]

        history: IListen[]

        buedCourses : IBuedCurses[]

        orders: IOrder[]
    }