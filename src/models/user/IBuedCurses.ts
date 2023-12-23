import { ICours } from '../cours/ICours';
import { IUser } from './IUser';

export interface IBuedCurses {
    fromUser: IUser;
    userId: number;
    courseId: number;
    cours: ICours;
}