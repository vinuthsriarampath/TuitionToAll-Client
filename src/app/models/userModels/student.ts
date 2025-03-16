import { User } from "./user";

export interface Student extends User{
    firstName?:string;
    lastName?:string;
    dob?:Date;
}
