import { User } from "./user";

export interface Teacher extends User{
    firstName?:string;
    lastName?:string;
    dob?:Date;
}
