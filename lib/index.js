"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.USER_SERVICE_URL = "https://users.tko-aly.fi";
const user_endpoint = "/api/users/me";
var Service;
(function (Service) {
    Service["KJYR"] = "433f7cd9-e7db-42fb-aceb-c3716c6ef2b7";
    Service["EVENT_CALENDAR"] = "65a0058d-f9da-4e76-a00a-6013300cab5f";
})(Service = exports.Service || (exports.Service = {}));
function getMyData(token, serviceIdentifier, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default
            .create({
            baseURL: options && options.baseURL ? options.baseURL : exports.USER_SERVICE_URL,
            timeout: options && options.timeout ? options.timeout : 2000,
            headers: {
                Authorization: "Bearer " + token,
                Service: serviceIdentifier
            }
        })
            .get(user_endpoint);
        return res.data;
    });
}
exports.default = {
    getMyData
};
