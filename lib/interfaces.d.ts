export interface PermissionOperations {
    operationName: string;
    operationCode: string;
    permitted: boolean;
}
export interface PermissonFeatures {
    featureName: string;
    featureCode: string;
    permitted: boolean;
    hasChildOperation: boolean;
    operations: PermissionOperations[];
}
export interface PermissionModule {
    moduleCode: string;
    permitted: boolean;
    moduleName: string;
    features: PermissonFeatures[];
}
export interface RoleAndPermission {
    role_name: string;
    role_description: string;
    modules: PermissionModule[];
    createdAt: string;
}
