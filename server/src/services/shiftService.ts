import { SquareClient } from 'square';
import dotenv from 'dotenv';

dotenv.config();

export class ShiftService {
    getShifts(startDate: string, endDate: string) {
        throw new Error('Method not implemented.');
    }
    private client: SquareClient;

    constructor() {
        this.client = new SquareClient({
            token: process.env.SQUARE_API_TOKEN,
            environment: process.env.ENVIRONMENT
        });
    }

    async searchShifts(startDate: string, endDate: string) {
        try {
            const response = await this.client.labor.shifts.search({
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
        } catch (error) {
            console.error('Error in searchShifts:', error);
            throw error;
        }
    }
}