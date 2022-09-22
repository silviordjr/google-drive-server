"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DriveController_1 = __importDefault(require("./controller/DriveController"));
const app_1 = __importDefault(require("./app"));
const driveController = new DriveController_1.default();
app_1.default.get('/', driveController.get);
