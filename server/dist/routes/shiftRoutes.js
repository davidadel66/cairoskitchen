"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shiftController_1 = require("../controllers/shiftController");
const router = express_1.default.Router();
const shiftController = new shiftController_1.ShiftController();
router.get('/:startDate/:endDate', (req, res) => shiftController.getShifts(req, res));
exports.default = router;
