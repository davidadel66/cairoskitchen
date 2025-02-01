import request from 'supertest';
import { app } from '../../src/server';
import { describe, it, expect } from '@jest/globals';

describe('Shifts API', () => {
    it('should get shifts for date range', async () => {
        const startDate = '2024-03-20';
        const endDate = '2024-03-21';
        
        const response = await request(app)
            .get(`/api/shifts/${startDate}/${endDate}`)
            .expect('Content-Type', /json/)
            .expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
    });
}); 