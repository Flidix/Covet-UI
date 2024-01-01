import { IUser } from '../user/user';
import { IGroup } from './group';

export interface IUserToGroups {
    id: number;
    user: IUser;
    userId: number;
    group: IGroup;
    groupId: number;
}