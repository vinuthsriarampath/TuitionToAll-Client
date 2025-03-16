import { User } from "../models/userModels/user";

export interface AuthResponse {
    token?:string;
    user?:User;
}
