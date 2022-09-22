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
Object.defineProperty(exports, "__esModule", { value: true });
class DriveServices {
    get(parentID) {
        return __awaiter(this, void 0, void 0, function* () {
            const myFiles = yield drive.files.list({
                pageSize: 1000,
                fields: 'nextPageToken, files(id, name, parents, webViewLink, iconLink, mimeType)',
                q: `'${parentID}' in parents`,
                supportsAllDrives: true,
                includeItemsFromAllDrives: true
            });
            return myFiles.data.files;
        });
    }
}
exports.default = DriveServices;
