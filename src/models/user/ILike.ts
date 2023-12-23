import { ICours } from '../cours/ICours';
import { IUser } from './IUser';

export interface ILike {
    fromUser: IUser;
    toCours: ICours;
}