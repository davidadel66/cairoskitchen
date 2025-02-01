// GET http://localhost:3001/api/shifts/2024-03-20/2024-03-21
// startDate and endDate in the route are URL parameters and then accessible in req.params in 
// shiftcontroller


import express from 'express';
import { ShiftController } from '../controllers/shiftController';

const router = express.Router();
const shiftController = new ShiftController();

router.get('/:startDate/:endDate', (req, res) => 
    shiftController.getShifts(req, res)
)

export default router