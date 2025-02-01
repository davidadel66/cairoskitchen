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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftService = void 0;
const square_1 = require("square");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ShiftService {
    constructor() {
        this.client = new square_1.SquareClient({
            token: process.env.SQUARE_API_TOKEN,
            environment: process.env.ENVIRONMENT
        });
    }
    searchShifts(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.labor.shifts.search({
                    query: {
                        filter: {
                            workday: {
                                dateRange: { startDate, endDate },
                                defaultTimezone: "America/New_York",
                                matchShiftsBy: "START_AT",
                            },
                            status: "CLOSED",
                        },
                        sort: {
                            field: "CREATED_AT",
                            order: "ASC",
                        },
                    },
                    limit: 20,
                });
                return response.shifts;
            }
            catch (error) {
                console.error('Error in searchShifts:', error);
                throw error;
            }
        });
    }
}
exports.ShiftService = ShiftService;
