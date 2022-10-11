"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIfUserIsPermitted = exports.Greeter1 = exports.Greeter = void 0;
var Greeter = function (name) { return "Hello ".concat(name); };
exports.Greeter = Greeter;
var Greeter1 = function (name) { return "Hello ".concat(name); };
exports.Greeter1 = Greeter1;
//* =========================================== HOW IT WORKS ====================================  
// ! POINT => [ 1 ]
// ? LENGTH 1 = Module level permission
// ? LENGTH 2 = Feature level permission
// ? LENGTH 3 = Operation level permission
// REMEMBER :
// Every level [ module, feature , operation ] key code cannot have same key name it can cause security issue
// When adding new role and permission validate json that no module level key code should be same
var PERMITTED = "PERMITTED";
var NOT_PERMITTED = "NOT_PERMITTED";
function newModuleLevelCheck(permissionArray, requiredPermission) {
    console.log(permissionArray.modules);
    var _moduleLevelPermissionCode = requiredPermission[0]; // extract module code
    var moduleSearchResult = permissionArray.modules.filter(function (module) { return module.moduleCode === _moduleLevelPermissionCode; });
    console.log({ moduleSearchResult: moduleSearchResult });
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
        };
    }
    throw new Error("Something Went wrong in module");
}
function newFeatureLevelCheck(featureArray, requiredPermission) {
    var _featureLevelPermissionCode = requiredPermission[1]; // extract feature code
    var featureSearchResult = featureArray.filter(function (feature) { return feature.featureCode === _featureLevelPermissionCode; });
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
        };
    }
    throw new Error("Something Went wrong in feature");
}
function newOperationCheck(operationArray, requiredPermission) {
    var _operationLevelPermissionCode = requiredPermission[2]; // extract operation code
    var operationSearchResult = operationArray.filter(function (operation) { return operation.operationCode === _operationLevelPermissionCode; });
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
        };
    }
    throw new Error("Something Went wrong in operation");
}
var CheckIfUserIsPermitted = function (permissionArray, requiredPermission) { return __awaiter(void 0, void 0, void 0, function () {
    var lengthOfRequiredPermission, _a, feature, moduleStatus, _b, feature, moduleStatus, _c, featureStatus, operation, _d, feature, moduleStatus, _e, featureStatus, operation, operationStatus;
    return __generator(this, function (_f) {
        lengthOfRequiredPermission = requiredPermission.length;
        if (lengthOfRequiredPermission > 3) {
            throw new Error("Invalid Required permission");
        }
        // this will check module level permission 
        if (lengthOfRequiredPermission === 1) {
            _a = newModuleLevelCheck(permissionArray, requiredPermission), feature = _a.feature, moduleStatus = _a.status;
            if (moduleStatus !== PERMITTED) {
                return [2 /*return*/, {
                        status: NOT_PERMITTED,
                        type: "MODULE",
                        message: "Module not Permitted."
                    }];
            }
        }
        // this will check feature level permission 
        if (lengthOfRequiredPermission === 2) {
            _b = newModuleLevelCheck(permissionArray, requiredPermission), feature = _b.feature, moduleStatus = _b.status;
            if (moduleStatus !== PERMITTED) {
                return [2 /*return*/, {
                        status: NOT_PERMITTED,
                        type: "MODULE",
                        message: "Module not Permitted."
                    }];
            }
            _c = newFeatureLevelCheck(feature, requiredPermission), featureStatus = _c.status, operation = _c.operation;
            if (featureStatus !== PERMITTED) {
                return [2 /*return*/, {
                        status: NOT_PERMITTED,
                        type: "FEATURE",
                        message: "Feature not Permitted."
                    }];
            }
        }
        //  this will check feature level permission
        if (lengthOfRequiredPermission === 3) {
            _d = newModuleLevelCheck(permissionArray, requiredPermission), feature = _d.feature, moduleStatus = _d.status;
            if (moduleStatus !== PERMITTED) {
                return [2 /*return*/, {
                        status: NOT_PERMITTED,
                        type: "MODULE",
                        message: "Module not Permitted."
                    }];
            }
            _e = newFeatureLevelCheck(feature, requiredPermission), featureStatus = _e.status, operation = _e.operation;
            if (featureStatus !== PERMITTED) {
                return [2 /*return*/, {
                        status: NOT_PERMITTED,
                        type: "FEATURE",
                        message: "Feature not Permitted."
                    }];
            }
            operationStatus = newOperationCheck(operation, requiredPermission).status;
            if (operationStatus !== PERMITTED) {
                return [2 /*return*/, {
                        status: NOT_PERMITTED,
                        type: "OPERATION",
                        message: "Operation not Permitted."
                    }];
            }
        }
        return [2 /*return*/, {
                status: PERMITTED,
                mesasge: "User permitted.."
            }];
    });
}); };
exports.CheckIfUserIsPermitted = CheckIfUserIsPermitted;
