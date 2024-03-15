"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderGuard = void 0;
const common_1 = require("@nestjs/common");
const CryptoJS = require("crypto-js");
let HeaderGuard = class HeaderGuard {
    canActivate(context) {
        const headers = context.switchToHttp().getRequest().headers;
        console.log(headers.email);
        console.log(this.decrypt(headers.email));
        console.log(headers.displayname);
        console.log(this.decrypt(headers.displayname));
        if (!headers.displayname || !headers.email) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    decrypt(encryptedData) {
        const key = CryptoJS.enc.Utf8.parse('0n6/1VTsUN5NdgwkRZINjAe9GcEcqHo/3nzPT91xFAc=');
        const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        });
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    }
};
exports.HeaderGuard = HeaderGuard;
exports.HeaderGuard = HeaderGuard = __decorate([
    (0, common_1.Injectable)()
], HeaderGuard);
//# sourceMappingURL=header.guard.js.map