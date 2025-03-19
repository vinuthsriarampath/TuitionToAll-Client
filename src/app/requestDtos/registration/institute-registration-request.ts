import { UserRegistrationRequest } from "./user-registration-request";

export interface InstituteRegistrationRequest extends UserRegistrationRequest{
    instituteName?:string;
}
