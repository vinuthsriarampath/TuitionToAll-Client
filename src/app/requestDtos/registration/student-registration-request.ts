import { UserRegistrationRequest } from "./user-registration-request";

export interface StudentRegistrationRequest extends UserRegistrationRequest{
    firstName?:string;
    lastName?:string;
    dob?:Date;
}
