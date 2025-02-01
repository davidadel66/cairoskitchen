import request from "supertest";
import express from "express";
import { app } from "../../src/server";
import { describe, it, expect } from '@jest/globals';

describe('Health Check Endpoint', () => {
    it('should return 200 and healthy status', async () => {
        const response = await request(app)
            .get('/api/health')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('status', 'healthy');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('uptime');
        expect(response.body).toHaveProperty('memoryUsage');
        expect(response.body.memoryUsage).toHaveProperty('heapUsed');
        expect(response.body.memoryUsage).toHaveProperty('heapTotal');
    });

    it('should return valid timestamp', async () => {
        const response = await request(app)
            .get('/api/health');
        
        const timestamp = new Date(response.body.timestamp);
        expect(timestamp).toBeInstanceOf(Date);
        expect(isNaN(timestamp.getTime())).toBe(false);
    });

    it('should return numeric values for memory usage', async () => {
        const response = await request(app)
            .get('/api/health');
        
        expect(typeof response.body.memoryUsage.heapUsed).toBe('number');
        expect(typeof response.body.memoryUsage.heapTotal).toBe('number');
    });
});


