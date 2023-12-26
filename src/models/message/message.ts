import { IGroup } from "../group/group";
import { IUser } from "../user/user";

export interface IMessage {
    message: string;
    userId: number;
    groupId: number;
    user: IUser;
    group: IGroup;
}