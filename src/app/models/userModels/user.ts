import { Roles } from "../../enums/roles";

export interface User {
    id?: number;
    address?: string;
    contact?: string;
    email?: string;
    role?: Roles;
    isDisabled?: boolean;
}
