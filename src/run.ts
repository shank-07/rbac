import { CheckIfUserIsPermitted } from ".";
import { PermissionModule, RoleAndPermission } from "./interfaces";


const roleAndPermissionJSon: RoleAndPermission = {
    createdAt: "",
    modules: [{features : [], moduleCode : "user", moduleName : "user" , permitted : false}],
    role_description: "",
    role_name: ""
}



async function runner(): Promise<void> {
    const result = await CheckIfUserIsPermitted(roleAndPermissionJSon, ['user']);
    console.log({ result });
}

runner();