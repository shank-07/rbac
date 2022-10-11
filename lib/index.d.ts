import { RoleAndPermission } from "./interfaces";
export declare const Greeter: (name: string) => string;
export declare const Greeter1: (name: string) => string;
export declare const CheckIfUserIsPermitted: (permissionArray: RoleAndPermission, requiredPermission: string[]) => Promise<{
    status: string;
    type: string;
    message: string;
    mesasge?: undefined;
} | {
    status: string;
    mesasge: string;
    type?: undefined;
    message?: undefined;
}>;
