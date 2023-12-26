import { IUser } from "../user/user";
import { IGroup } from "./group";

export interface IUserToGroups {
    user: IUser;
    userId: number;
    group: IGroup;
    groupId: number;
}