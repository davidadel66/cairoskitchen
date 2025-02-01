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
exports.ShiftController = void 0;
const shiftService_1 = require("../services/shiftService");
class ShiftController {
    constructor() {
        this.shiftService = new shiftService_1.ShiftService();
    }
    getShifts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.params;
                const response = yield this.shiftService.searchShifts(startDate, endDate);
                // Convert BigInt to string
                const convertBigIntToString = (obj) => {
                    if (typeof obj === 'bigint') {
                        return obj.toString();
                    }
                    else if (Array.isArray(obj)) {
                        return obj.map(convertBigIntToString);
                    }
                    else if (typeof obj === 'object' && obj !== null) {
                        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, convertBigIntToString(value)]));
                    }
                    return obj;
                };
                const safeResponse = convertBigIntToString(response);
                res.json(safeResponse);
            }
            catch (error) {
                console.error('Error fetching shifts:', error);
                res.status(500).json({ error: 'Failed to fetch shifts' });
            }
        });
    }
}
exports.ShiftController = ShiftController;
