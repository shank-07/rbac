import { RoleAndPermission, PermissionModule, PermissonFeatures, PermissionOperations } from "./interfaces";

export const Greeter = (name: string) => `Hello ${name}`;

export const Greeter1 = (name: string) => `Hello ${name}`;




//* =========================================== HOW IT WORKS ====================================  


// ! POINT => [ 1 ]
// ? LENGTH 1 = Module level permission
// ? LENGTH 2 = Feature level permission
// ? LENGTH 3 = Operation level permission

// REMEMBER :
// Every level [ module, feature , operation ] key code cannot have same key name it can cause security issue
// When adding new role and permission validate json that no module level key code should be same

const PERMITTED = "PERMITTED";
const NOT_PERMITTED = "NOT_PERMITTED";


function newModuleLevelCheck(permissionArray: RoleAndPermission, requiredPermission: string[]) {

    console.log(permissionArray.modules)

    let _moduleLevelPermissionCode = requiredPermission[0]; // extract module code


    const moduleSearchResult = permissionArray.modules.filter((module: PermissionModule) => module.moduleCode === _moduleLevelPermissionCode);
    console.log({ moduleSearchResult })
    if (moduleSearchResult.length === 0) {
        throw new Error("No Such Module ");
    }

    if (moduleSearchResult.length > 1) {
        throw new Error("Duplicate Module Found");
    }

    if (moduleSearchResult.length === 1) {
        // assume only one module with module code exits
        return {
            status: (moduleSearchResult[0].moduleCode === _moduleLevelPermissionCode && moduleSearchResult[0].permitted === true) ? PERMITTED : NOT_PERMITTED,
            feature: moduleSearchResult[0].features
        }
    }

    throw new Error("Something Went wrong in module");

}

function newFeatureLevelCheck(featureArray: PermissonFeatures[], requiredPermission: string[]) {

    let _featureLevelPermissionCode = requiredPermission[1]; // extract feature code

    const featureSearchResult = featureArray.filter((feature: PermissonFeatures) => feature.featureCode === _featureLevelPermissionCode);
    if (featureSearchResult.length === 0) {
        throw new Error("No Such Feature ");
    }

    if (featureSearchResult.length > 1) {
        throw new Error("Duplicate Feature Code Found");
    }

    if (featureSearchResult.length === 1) {

        return {
            status: featureSearchResult[0].featureCode === _featureLevelPermissionCode && featureSearchResult[0].permitted === true ? PERMITTED : NOT_PERMITTED,
            operation: featureSearchResult[0].operations
        }

    }

    throw new Error("Something Went wrong in feature");

}

function newOperationCheck(operationArray: PermissionOperations[], requiredPermission: string[]) {

    let _operationLevelPermissionCode = requiredPermission[2]; // extract operation code

    const operationSearchResult = operationArray.filter((operation: PermissionOperations) => operation.operationCode === _operationLevelPermissionCode);
    if (operationSearchResult.length === 0) {
        throw new Error("No Such Operation ");
    }

    if (operationSearchResult.length > 1) {
        throw new Error("Duplicate Operation Code Found");
    }

    if (operationSearchResult.length === 1) {
        // assume only one module with module code exits
        // user permitted to access this module
        return {
            status: operationSearchResult[0].operationCode === _operationLevelPermissionCode && operationSearchResult[0].permitted === true ? PERMITTED : NOT_PERMITTED,
        }
    }

    throw new Error("Something Went wrong in operation");

}


export const CheckIfUserIsPermitted = async (permissionArray: RoleAndPermission, requiredPermission: string[]) => {


    //  calculate length of required permission 
    const lengthOfRequiredPermission = requiredPermission.length;

    if (lengthOfRequiredPermission > 3) {
        throw new Error("Invalid Required permission");
    }

    // this will check module level permission 
    if (lengthOfRequiredPermission === 1) {

        const { feature, status: moduleStatus } = newModuleLevelCheck(permissionArray, requiredPermission);
        if (moduleStatus !== PERMITTED) {
            return {
                status: NOT_PERMITTED,
                type: "MODULE",
                message: "Module not Permitted."
            }
        }
    }

    // this will check feature level permission 
    if (lengthOfRequiredPermission === 2) {

        const { feature, status: moduleStatus } = newModuleLevelCheck(permissionArray, requiredPermission);
        if (moduleStatus !== PERMITTED) {

            return {
                status: NOT_PERMITTED,
                type: "MODULE",
                message: "Module not Permitted."
            }

        }

        const { status: featureStatus, operation } = newFeatureLevelCheck(feature, requiredPermission);
        if (featureStatus !== PERMITTED) {

            return {
                status: NOT_PERMITTED,
                type: "FEATURE",
                message: "Feature not Permitted."
            }

        }
    }


    //  this will check feature level permission
    if (lengthOfRequiredPermission === 3) {

        const { feature, status: moduleStatus } = newModuleLevelCheck(permissionArray, requiredPermission);
        if (moduleStatus !== PERMITTED) {

            return {
                status: NOT_PERMITTED,
                type: "MODULE",
                message: "Module not Permitted."
            }

        }

        const { status: featureStatus, operation } = newFeatureLevelCheck(feature, requiredPermission);
        if (featureStatus !== PERMITTED) {

            return {
                status: NOT_PERMITTED,
                type: "FEATURE",
                message: "Feature not Permitted."
            }

        }

        const { status: operationStatus } = newOperationCheck(operation, requiredPermission);
        if (operationStatus !== PERMITTED) {
            return {
                status: NOT_PERMITTED,
                type: "OPERATION",
                message: "Operation not Permitted."
            }
        }

    }


    return {
        status: PERMITTED,
        mesasge: "User permitted.."
    }
}
