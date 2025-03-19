import { UserRegistrationRequest } from "./user-registration-request";

export interface TeacherRegistrationRequest extends UserRegistrationRequest{
    firstName?:string;
    lastName?:string;
    dob?:Date;
}
