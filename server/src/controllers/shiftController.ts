import { Request, Response } from 'express';
import { ShiftService } from '../services/shiftService';

export class ShiftController {
    private shiftService: ShiftService;

    constructor() {
        this.shiftService = new ShiftService();
    }

    async getShifts(req: Request, res: Response) {
        try {
            const { startDate, endDate } = req.params;
            const response = await this.shiftService.searchShifts(startDate, endDate);
            
            const convertBigIntToString = (obj: any): any => {
                if (typeof obj === 'bigint') {
                    return obj.toString();
                } else if (Array.isArray(obj)) {
                    return obj.map(convertBigIntToString);
                } else if (typeof obj === 'object' && obj !== null) {
                    return Object.fromEntries(
                        Object.entries(obj).map(([key, value]) => [key, convertBigIntToString(value)])
                    );
                }
                return obj;
            };

            const safeResponse = convertBigIntToString(response);
            res.json(safeResponse);
        } catch (error) {
            console.error('Error fetching shifts:', error);
            res.status(500).json({ error: 'Failed to fetch shifts' });
        }
    }
}
