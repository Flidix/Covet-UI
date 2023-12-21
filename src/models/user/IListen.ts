import {IUser} from "./IUser";
import {IVideo} from "../cours/IVideo";

export interface IListen {
    fromUser: IUser;
    toVideo: IVideo;
}