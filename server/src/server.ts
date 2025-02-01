import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import shiftRoutes from './routes/shiftRoutes';
import cors from 'cors';

dotenv.config();

interface HealthResponse {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    uptime: number;
    memoryUsage: {
        heapUsed: number;
        heapTotal?: number;
    };
}
export const app: express.Application = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Allow any incoming requests from that url :5173, if website it would be the website page



app.use("/api/shifts", shiftRoutes); 

app.get("/api/health", (req: Request, res: Response) => {
    const healthCheck: HealthResponse = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsage: {
            heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), //MB
            heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) // MB
        }
    }
    res.json(healthCheck);
}); 

const PORT = process.env.PORT || 3001

// Only start server if file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} 